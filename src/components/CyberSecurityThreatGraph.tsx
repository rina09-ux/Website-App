import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Eye, 
  GitPullRequest, 
  Terminal, 
  Layers, 
  AlertTriangle, 
  Info,
  Server,
  Database,
  Globe,
  Key,
  Cpu,
  Bot,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Language } from '../data/translations';
import { IconChoiceTabs } from './magic/IconChoiceTabs';

export interface ThreatNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  category: 'internet' | 'edge' | 'compute' | 'iam' | 'datastore' | 'ai' | 'pqc_shield';
  status: 'compromised' | 'vulnerable' | 'secured' | 'neutral';
  cloud: 'AWS' | 'GCP' | 'Azure' | 'Sovereign ID' | 'Public';
  ipOrArn?: string;
  cve?: string;
  pqcAlgorithm?: string;
  blastRadius: number; // 1-100
  details: string;
}

export interface ThreatLink extends d3.SimulationLinkDatum<ThreatNode> {
  source: string | ThreatNode;
  target: string | ThreatNode;
  type: 'attack_vector' | 'lateral_movement' | 'credential_theft' | 'pqc_encrypted' | 'data_flow';
  severity: 'critical' | 'high' | 'medium' | 'safe';
  protocol: string;
}

interface CyberSecurityThreatGraphProps {
  language?: Language;
  onOpenDemo?: () => void;
  onOpenAi?: () => void;
}

export const CyberSecurityThreatGraph: React.FC<CyberSecurityThreatGraphProps> = ({
  language = 'id',
  onOpenDemo,
  onOpenAi,
}) => {
  const isId = language === 'id';
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [selectedScenario, setSelectedScenario] = useState<'full_chain' | 'pqc_hndl' | 'ai_exfil' | 'all_active'>('full_chain');
  const [selectedNode, setSelectedNode] = useState<ThreatNode | null>(null);
  const [isRemediated, setIsRemediated] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('all');

  // Scenarios and Base Datasets
  const rawNodes: ThreatNode[] = useMemo(() => {
    return [
      {
        id: 'attacker_origin',
        label: isId ? 'Penyerang Internet (Public Threat)' : 'Internet Ingress Threat',
        category: 'internet',
        status: isRemediated ? 'neutral' : 'compromised',
        cloud: 'Public',
        ipOrArn: '198.51.100.44 (AS-Tor-Exit)',
        blastRadius: 95,
        details: isId ? 'Sumber penyerang eksternal melakukan pemindaian port 0.0.0.0/0 dan eksploitasi zero-day' : 'External threat actor conducting automated port reconnaissance and ingress exploit execution'
      },
      {
        id: 'public_alb',
        label: 'Public ALB (Jakarta Region)',
        category: 'edge',
        status: isRemediated ? 'secured' : 'vulnerable',
        cloud: 'AWS',
        ipOrArn: 'alb.prod-id.nusasec.cloud',
        cve: 'CVE-2024-3400 (WAF Ingress Bypass)',
        pqcAlgorithm: isRemediated ? 'ML-KEM-768 Hybrid TLS 1.3' : 'Legacy RSA-2048',
        blastRadius: 80,
        details: isId ? 'Application Load Balancer dengan sertifikat RSA-2048 yang rentan terhadap penyadapan HNDL' : 'Public Ingress Load Balancer with legacy RSA cert vulnerable to Harvest Now Decrypt Later'
      },
      {
        id: 'k8s_frontend_pod',
        label: 'Frontend Node (EKS Pod)',
        category: 'compute',
        status: isRemediated ? 'secured' : 'compromised',
        cloud: 'AWS',
        ipOrArn: 'arn:aws:eks:ap-southeast-3:pod/fe-app-9b4',
        cve: 'CVE-2024-21626 (Runc Container Escape)',
        blastRadius: 85,
        details: isId ? 'Pod frontend memiliki izin Service Account yang terlalu longgar (IAM Over-privileged)' : 'Frontend pod with container breakout vulnerability and mounted high-privilege service token'
      },
      {
        id: 'iam_admin_role',
        label: 'Over-privileged IAM Role',
        category: 'iam',
        status: isRemediated ? 'secured' : 'compromised',
        cloud: 'AWS',
        ipOrArn: 'arn:aws:iam::123456789012:role/ClusterAdmin',
        blastRadius: 92,
        details: isId ? 'IAM Role dengan hak istimewa iam:PassRole & s3:* lintas akun tanpa MFA terpaksa' : 'IAM Role possessing cross-account admin privileges without mandatory conditional boundary'
      },
      {
        id: 'mcp_ai_agent',
        label: 'MCP Autonomous Agent Server',
        category: 'ai',
        status: isRemediated ? 'secured' : 'vulnerable',
        cloud: 'GCP',
        ipOrArn: 'gcp:projects/prod-ai/mcp-server-01',
        cve: 'Prompt Injection / Tool SSRF',
        pqcAlgorithm: isRemediated ? 'FIPS 204 Signed Proofs' : 'Standard Bearer Token',
        blastRadius: 78,
        details: isId ? 'Server Model Context Protocol memiliki akses baca langsung ke database tanpa isolasi RAG' : 'Model Context Protocol server with direct un-sandboxed datastore querying capability'
      },
      {
        id: 'vertex_frontier_model',
        label: 'Vertex AI / LLM Foundation Cluster',
        category: 'ai',
        status: isRemediated ? 'secured' : 'neutral',
        cloud: 'GCP',
        ipOrArn: 'vertex-ai.asia-southeast2.gcp',
        blastRadius: 65,
        details: isId ? 'Model AI enterprise yang menangani inferensi data perbankan sensitif' : 'Enterprise foundation model handling live financial inference embeddings'
      },
      {
        id: 'sovereign_db',
        label: 'Postgres Kedaulatan Data (OJK Mandate)',
        category: 'datastore',
        status: isRemediated ? 'secured' : 'vulnerable',
        cloud: 'Sovereign ID',
        ipOrArn: 'db-sovereign.jkt.internal:5432',
        pqcAlgorithm: isRemediated ? 'ML-KEM-768 at Rest' : 'AES-256 (Static Key)',
        blastRadius: 100,
        details: isId ? 'Database kedaulatan data nasabah yang diatur UU PDP & POJK 11, target akhir penyerang' : 'Sovereign core banking customer database subject to UU PDP and POJK 11 data protection'
      },
      {
        id: 'pqc_shield_sentinel',
        label: 'NusaSec PQC Agility Vault',
        category: 'pqc_shield',
        status: 'secured',
        cloud: 'Sovereign ID',
        ipOrArn: 'vault.nusasec.internal (FIPS 203)',
        pqcAlgorithm: 'ML-KEM-1024 / ML-DSA-87',
        blastRadius: 10,
        details: isId ? 'Brankas orkestrasi kriptografi pasca-kuantum otomatis yang menegakkan enkripsi tahan kuantum' : 'Automated Post-Quantum Agility controller enforcing quantum-safe keys across multi-cloud'
      }
    ];
  }, [isId, isRemediated]);

  const rawLinks: ThreatLink[] = useMemo(() => {
    if (isRemediated) {
      // Clean, secured posture links
      return [
        { source: 'attacker_origin', target: 'public_alb', type: 'pqc_encrypted', severity: 'safe', protocol: 'TLS 1.3 (BLOCKED)' },
        { source: 'public_alb', target: 'k8s_frontend_pod', type: 'pqc_encrypted', severity: 'safe', protocol: 'mTLS ML-KEM-768' },
        { source: 'k8s_frontend_pod', target: 'pqc_shield_sentinel', type: 'pqc_encrypted', severity: 'safe', protocol: 'FIPS 203 Vault Proxy' },
        { source: 'pqc_shield_sentinel', target: 'sovereign_db', type: 'pqc_encrypted', severity: 'safe', protocol: 'Quantum-Safe Encrypted' },
        { source: 'mcp_ai_agent', target: 'pqc_shield_sentinel', type: 'pqc_encrypted', severity: 'safe', protocol: 'RBAC Policy Sandboxed' },
        { source: 'vertex_frontier_model', target: 'pqc_shield_sentinel', type: 'pqc_encrypted', severity: 'safe', protocol: 'Zero-Retention Pipe' },
      ];
    }

    // Active Attack Paths
    return [
      { source: 'attacker_origin', target: 'public_alb', type: 'attack_vector', severity: 'critical', protocol: 'HTTPS Ingress Port 443' },
      { source: 'public_alb', target: 'k8s_frontend_pod', type: 'attack_vector', severity: 'critical', protocol: 'HTTP Proxy Forward' },
      { source: 'k8s_frontend_pod', target: 'iam_admin_role', type: 'credential_theft', severity: 'critical', protocol: 'Kubelet SA Token Steal' },
      { source: 'iam_admin_role', target: 'mcp_ai_agent', type: 'lateral_movement', severity: 'high', protocol: 'Cross-Cloud GCP IAM Impersonation' },
      { source: 'mcp_ai_agent', target: 'vertex_frontier_model', type: 'data_flow', severity: 'medium', protocol: 'API Inferencing' },
      { source: 'iam_admin_role', target: 'sovereign_db', type: 'attack_vector', severity: 'critical', protocol: 'RDS Direct Admin Ingress' },
      { source: 'mcp_ai_agent', target: 'sovereign_db', type: 'data_flow', severity: 'high', protocol: 'Unfiltered SQL Query' },
      { source: 'pqc_shield_sentinel', target: 'sovereign_db', type: 'pqc_encrypted', severity: 'safe', protocol: 'Monitoring Sensor' },
    ];
  }, [isRemediated]);

  // Filter based on selected Scenario
  const { filteredNodes, filteredLinks } = useMemo(() => {
    let nodes = [...rawNodes];
    let links = [...rawLinks];

    if (selectedScenario === 'pqc_hndl') {
      const allowed = ['attacker_origin', 'public_alb', 'pqc_shield_sentinel', 'sovereign_db'];
      nodes = nodes.filter(n => allowed.includes(n.id));
      links = links.filter(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        return allowed.includes(s) && allowed.includes(t);
      });
    } else if (selectedScenario === 'ai_exfil') {
      const allowed = ['attacker_origin', 'mcp_ai_agent', 'vertex_frontier_model', 'sovereign_db', 'pqc_shield_sentinel'];
      nodes = nodes.filter(n => allowed.includes(n.id));
      links = links.filter(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        return allowed.includes(s) && allowed.includes(t);
      });
    }

    if (activeFilterCategory !== 'all') {
      nodes = nodes.filter(n => n.category === activeFilterCategory || n.category === 'pqc_shield' || n.id === 'attacker_origin');
      const nodeIds = nodes.map(n => n.id);
      links = links.filter(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        return nodeIds.includes(s) && nodeIds.includes(t);
      });
    }

    return { filteredNodes: nodes, filteredLinks: links };
  }, [rawNodes, rawLinks, selectedScenario, activeFilterCategory]);

  // Color mapping helper
  const getNodeColor = (node: ThreatNode) => {
    if (node.category === 'pqc_shield') return '#325FE8'; // Brand Blue
    if (node.status === 'compromised') return '#ef4444'; // Red
    if (node.status === 'vulnerable') return '#f59e0b'; // Amber
    if (node.status === 'secured') return '#16a34a'; // Green (safe)
    return '#38bdf8'; // Sky Blue
  };

  const getLinkColor = (link: ThreatLink) => {
    if (link.severity === 'critical') return '#ef4444';
    if (link.severity === 'high') return '#f97316';
    if (link.severity === 'medium') return '#38bdf8';
    return '#16a34a'; // Green (safe/low)
  };

  // Trigger Remediation Action Simulation
  const handleSimulateRemediate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsRemediated(prev => !prev);
      setIsSimulating(false);
    }, 600);
  };

  // D3 Graph Initialization & Update Effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 560;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Clear previous elements
    svg.selectAll('*').remove();

    // Definitions (Gradients & Filters)
    const defs = svg.append('defs');

    // Glow filter for nodes
    const filter = defs.append('filter')
      .attr('id', 'd3-node-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'blur');
    filter.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');

    // Arrowhead markers for attack links
    ['critical', 'high', 'medium', 'safe'].forEach(sev => {
      const color = sev === 'critical' ? '#ef4444' : sev === 'high' ? '#f97316' : sev === 'medium' ? '#38bdf8' : '#325FE8';
      defs.append('marker')
        .attr('id', `arrow-${sev}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 28)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', color);
    });

    // Zoom container
    const g = svg.append('g').attr('class', 'graph-container');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep copy data for D3 mutation
    const nodes: ThreatNode[] = filteredNodes.map(d => ({ ...d }));
    const links: ThreatLink[] = filteredLinks.map(d => ({ ...d }));

    // Set up D3 Force Simulation
    const simulation = d3.forceSimulation<ThreatNode>(nodes)
      .force('link', d3.forceLink<ThreatNode, ThreatLink>(links).id(d => d.id).distance(135))
      .force('charge', d3.forceManyBody().strength(-480))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(48));

    // Render Links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => getLinkColor(d))
      .attr('stroke-width', d => d.severity === 'critical' ? 2.5 : 1.8)
      .attr('stroke-dasharray', d => d.type === 'pqc_encrypted' ? '4 3' : (d.severity === 'critical' ? '6 3' : 'none'))
      .attr('stroke-opacity', 0.8)
      .attr('marker-end', d => `url(#arrow-${d.severity})`)
      .attr('class', d => d.severity === 'critical' ? 'animate-pulse' : '');

    // Render Link Labels
    const linkLabels = g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('dy', -4)
      .text(d => d.protocol);

    // Render Nodes Container
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, ThreatNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Node Outer Pulse Ring for Compromised / PQC Sentinel
    node.filter(d => d.status === 'compromised' || d.category === 'pqc_shield')
      .append('circle')
      .attr('r', 26)
      .attr('fill', 'none')
      .attr('stroke', d => getNodeColor(d))
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.4)
      .attr('stroke-dasharray', '3 3')
      .attr('class', 'animate-spin origin-center');

    // Node Outer Solid Circle
    node.append('circle')
      .attr('r', 20)
      .attr('fill', '#ffffff')
      .attr('stroke', d => getNodeColor(d))
      .attr('stroke-width', 2.5)
      .attr('filter', 'url(#d3-node-glow)');

    // Node Inner Center Icon / Indicator
    node.append('circle')
      .attr('r', 7)
      .attr('fill', d => getNodeColor(d));

    // Node Label (Display Title)
    node.append('text')
      .attr('dy', 34)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('font-family', 'Plus Jakarta Sans, sans-serif')
      .attr('fill', '#0f172a')
      .text(d => d.label);

    // Node Subtitle (Cloud Platform / IP)
    node.append('text')
      .attr('dy', 47)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('fill', '#64748b')
      .text(d => `[${d.cloud}]`);

    // Interactive Hover & Click
    node.on('click', (event, d) => {
      event.stopPropagation();
      setSelectedNode(d);
    });

    node.on('mouseenter', function(event, d) {
      d3.select(this).select('circle:nth-child(2)')
        .transition()
        .duration(150)
        .attr('r', 24)
        .attr('stroke-width', 3.5);
    });

    node.on('mouseleave', function() {
      d3.select(this).select('circle:nth-child(2)')
        .transition()
        .duration(150)
        .attr('r', 20)
        .attr('stroke-width', 2.5);
    });

    // Reset selection on background click
    svg.on('click', () => {
      setSelectedNode(null);
    });

    // Simulation Tick Updates
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as ThreatNode).x || 0)
        .attr('y1', d => (d.source as ThreatNode).y || 0)
        .attr('x2', d => (d.target as ThreatNode).x || 0)
        .attr('y2', d => (d.target as ThreatNode).y || 0);

      linkLabels
        .attr('x', d => (((d.source as ThreatNode).x || 0) + ((d.target as ThreatNode).x || 0)) / 2)
        .attr('y', d => (((d.source as ThreatNode).y || 0) + ((d.target as ThreatNode).y || 0)) / 2);

      node.attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredNodes, filteredLinks, isRemediated]);

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden" id="threat-graph">
      
      {/* Ambient Cyber Coordinates Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header Title & Value Proposition */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>{isId ? 'VISUALISASI JALUR ANCAMAN INTERAKTIF D3.JS' : 'D3.JS INTERACTIVE THREAT GRAPH'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {isId ? (
                <>
                  Topologi Intelijen Ancaman & <span className="text-blue-600">Radius Ledakan Serangan</span>
                </>
              ) : (
                <>
                  Threat Intelligence Topology & <span className="text-blue-600">Attack Blast Radius</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId 
                ? 'Jelajahi graf node-link interaktif berbasis D3.js. Amati bagaimana keterpaparan internet publik, eksploitasi container escape, hak istimewa IAM, dan server MCP berkolerasi menyerang basis data kedaulatan data Anda.'
                : 'Explore real-time D3.js node-link attack path telemetry. Observe how internet ingress, container escape, IAM privileges, and MCP agent flows correlate towards your sovereign datastores.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateRemediate}
              disabled={isSimulating}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg whitespace-nowrap ${
                isRemediated
                  ? 'bg-slate-50 text-blue-600 border border-blue-200 hover:bg-slate-850'
                  : 'bg-blue-500 hover:bg-blue-400 text-slate-950'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>
                {isRemediated 
                  ? (isId ? 'Reset ke Skenario Rentan' : 'Reset to Vulnerable State') 
                  : (isId ? 'Simulasi Remediasi PQC & GitOps' : 'Simulate PQC & GitOps Fix')}
              </span>
            </button>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isId ? 'Jadwalkan Live Demo' : 'Book Live Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            )}
          </div>
        </div>

        {/* Live Metrics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{isId ? 'Status Postur' : 'Posture Status'}</div>
              <div className={`text-base font-bold ${isRemediated ? 'text-blue-600' : 'text-red-600'}`}>
                {isRemediated ? 'SECURED (PQC READY)' : 'CRITICAL THREAT ACTIVE'}
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${isRemediated ? 'bg-blue-400 animate-ping' : 'bg-red-400 animate-pulse'}`} />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase">{isId ? 'Radius Ledakan Maks' : 'Max Blast Radius'}</div>
            <div className="text-base font-bold text-slate-900">
              {isRemediated ? '12% (Isolated)' : '100% (Sovereign DB)'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase">{isId ? 'Enkripsi Pasca-Kuantum' : 'PQC Cipher Standard'}</div>
            <div className="text-base font-bold text-blue-600">
              {isRemediated ? 'NIST FIPS 203 (ML-KEM)' : 'Legacy RSA-2048 (HNDL Risk)'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase">{isId ? 'Kepatuhan Regulasi' : 'Compliance Audit'}</div>
            <div className="text-base font-bold text-purple-600">
              {isRemediated ? '100% Verified (POJK 11)' : '3 Violations Flagged'}
            </div>
          </div>
        </div>

        {/* Scenario Controls & Node Type Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50/80 border border-slate-200">
          
          {/* Scenario Tabs — icon-only, tap reveals full label as a tooltip */}
          <IconChoiceTabs
            caption={isId ? 'Skenario:' : 'Scenario:'}
            activeId={selectedScenario}
            onChange={(id) => {
              setSelectedScenario(id as typeof selectedScenario);
              setSelectedNode(null);
            }}
            items={[
              { id: 'full_chain', icon: ShieldAlert, label: isId ? 'Jalur Serangan Penuh (Ingress → DB)' : 'Full Kill-Chain (Ingress → DB)', colorClass: 'text-rose-600' },
              { id: 'pqc_hndl', icon: Lock, label: isId ? 'Paparan Sandi HNDL (RSA)' : 'HNDL Crypto Intercept', colorClass: 'text-amber-600' },
              { id: 'ai_exfil', icon: Bot, label: isId ? 'Eksfiltrasi Model AI (MCP)' : 'AI Model Pipeline (MCP)', colorClass: 'text-violet-600' },
            ]}
          />

          {/* Category Filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500 text-[11px] uppercase">{isId ? 'Filter Node:' : 'Filter:'}</span>
            <select
              value={activeFilterCategory}
              onChange={(e) => setActiveFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-300"
            >
              <option value="all">{isId ? 'Semua Kategori Node' : 'All Node Types'}</option>
              <option value="edge">Edge & Ingress ALB</option>
              <option value="compute">Compute / Pods</option>
              <option value="iam">IAM & Service Accounts</option>
              <option value="ai">Frontier AI / MCP</option>
              <option value="datastore">Sovereign Datastores</option>
            </select>
          </div>

        </div>

        {/* D3 Canvas Container + Detail Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main D3 SVG Canvas (8 Cols) */}
          <div 
            ref={containerRef}
            className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-2 relative shadow-2xl overflow-hidden min-h-[560px]"
          >
            {/* Watermark and Instructions */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>NusaSec Topology Engine • Drag nodes to interact • Click to inspect</span>
            </div>

            {/* D3 Rendered SVG */}
            <svg 
              ref={svgRef} 
              className="w-full h-[560px] select-none block"
            />

            {/* Canvas Legend */}
            <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-slate-600">Compromised / Attacker</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600">Vulnerable Vector</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-slate-600">PQC Secured Shield</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-slate-600">AI / Cloud Workload</span>
                </div>
              </div>

              <span className="text-slate-500 hidden sm:inline">Zoom: Scroll • Pan: Click & Drag Canvas</span>
            </div>

          </div>

          {/* Right Inspection & Telemetry Details Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider">
                  {isId ? 'Inspeksi Node Terpilih' : 'Node Telemetry Inspector'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-300">
                {selectedNode ? selectedNode.category.toUpperCase() : 'NO SELECTION'}
              </span>
            </div>

            {selectedNode ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* Node Identity Header */}
                <div className="space-y-1">
                  <div className="text-lg font-bold font-display text-slate-900">{selectedNode.label}</div>
                  <div className="text-xs font-mono text-slate-500 break-all">{selectedNode.ipOrArn}</div>
                </div>

                {/* Cloud & Status Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono text-slate-600">
                    Platform: <strong className="text-slate-900">{selectedNode.cloud}</strong>
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase border ${
                    selectedNode.status === 'compromised'
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : selectedNode.status === 'vulnerable'
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {selectedNode.status}
                  </span>
                </div>

                {/* Blast Radius Progress Bar */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">{isId ? 'Tingkat Dampak Serangan:' : 'Blast Radius Exposure:'}</span>
                    <span className={`font-bold ${selectedNode.blastRadius > 70 ? 'text-red-600' : 'text-blue-600'}`}>
                      {selectedNode.blastRadius}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedNode.blastRadius > 70 ? 'bg-red-500' : selectedNode.blastRadius > 40 ? 'bg-amber-500' : 'bg-blue-500'
                      }`} 
                      style={{ width: `${selectedNode.blastRadius}%` }}
                    />
                  </div>
                </div>

                {/* Technical Vulnerability / Cryptography Details */}
                <div className="space-y-2 text-xs">
                  {selectedNode.cve && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-300 font-mono">
                      <strong>CVE Impact:</strong> {selectedNode.cve}
                    </div>
                  )}

                  {selectedNode.pqcAlgorithm && (
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-300 font-mono">
                      <strong>Cipher Agility:</strong> {selectedNode.pqcAlgorithm}
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-slate-600 leading-relaxed font-sans text-xs">
                    {selectedNode.details}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSimulateRemediate}
                    className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <GitPullRequest className="w-4 h-4" />
                    <span>{isId ? 'Buat GitOps PR Perbaikan' : 'Generate Automated GitOps PR'}</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
                  <Eye className="w-6 h-6 text-slate-500" />
                </div>
                <div className="text-sm font-bold text-slate-600">
                  {isId ? 'Pilih salah satu node pada graf' : 'Select a node on the graph canvas'}
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  {isId 
                    ? 'Klik node (seperti EKS Pod, IAM Role, atau Sovereign DB) untuk melihat analisis radius ledakan dan detail kerentanannya.'
                    : 'Click any node on the D3 topology canvas to inspect real-time IAM rights, CVE vectors, and PQC status.'}
                </p>
              </div>
            )}

            {/* Bottom Support Info */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Graph Engine: D3 Force v7</span>
              <button 
                onClick={onOpenAi}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isId ? 'Analisis dengan AI' : 'Explain with AI'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
