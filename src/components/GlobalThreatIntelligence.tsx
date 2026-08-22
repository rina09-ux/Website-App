import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  Globe, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Radio, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Terminal, 
  Cpu, 
  Lock,
  Compass,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../data/translations';

export interface GlobalSecurityHub {
  id: string;
  name: string;
  country: string;
  coords: [number, number]; // [longitude, latitude]
  type: 'hq_sovereign' | 'regional_sentinel' | 'edge_pop' | 'cloud_datacenter';
  status: 'active' | 'mitigating' | 'pqc_shielded';
  pqcAlgorithm: string;
  eventsPerSec: number;
  activeAttacksBlocked: number;
  description: string;
}

export interface SecurityEventStream {
  id: string;
  timestamp: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  vector: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  action: string;
}

interface GlobalThreatIntelligenceProps {
  language?: Language;
  onOpenDemo?: () => void;
  onOpenAi?: () => void;
}

export const GlobalThreatIntelligence: React.FC<GlobalThreatIntelligenceProps> = ({
  language = 'id',
  onOpenDemo,
  onOpenAi,
}) => {
  const isId = language === 'id';
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.25);
  const [selectedHub, setSelectedHub] = useState<GlobalSecurityHub | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pqc' | 'critical'>('all');

  // Key Global PoPs / Security Hubs
  const securityHubs: GlobalSecurityHub[] = useMemo(() => [
    {
      id: 'jakarta_hq',
      name: 'Jakarta Sovereign Core (HQ)',
      country: 'Indonesia',
      coords: [106.8456, -6.2088],
      type: 'hq_sovereign',
      status: 'pqc_shielded',
      pqcAlgorithm: 'ML-KEM-1024 / ML-DSA-87',
      eventsPerSec: 14200,
      activeAttacksBlocked: 3412,
      description: isId 
        ? 'Pusat komando kedaulatan data nasional & brankas orkestrasi kriptografi FIPS 203/204.'
        : 'National sovereign data command center & FIPS 203/204 post-quantum agility vault.'
    },
    {
      id: 'singapore_hub',
      name: 'Singapore Regional Ingress',
      country: 'Singapore',
      coords: [103.8198, 1.3521],
      type: 'regional_sentinel',
      status: 'pqc_shielded',
      pqcAlgorithm: 'ML-KEM-768 Hybrid TLS 1.3',
      eventsPerSec: 28400,
      activeAttacksBlocked: 5120,
      description: isId 
        ? 'Gerbang transit cloud multi-region Asia Tenggara dengan mitigasi DDoS AI-SPM terintegrasi.'
        : 'Southeast Asia multi-region transit gateway with integrated AI-SPM automated mitigation.'
    },
    {
      id: 'tokyo_pop',
      name: 'Tokyo Cloud Edge Node',
      country: 'Japan',
      coords: [139.6917, 35.6895],
      type: 'edge_pop',
      status: 'active',
      pqcAlgorithm: 'ML-KEM-768',
      eventsPerSec: 19800,
      activeAttacksBlocked: 2190,
      description: isId 
        ? 'Edge node latensi rendah untuk inspeksi API Model Context Protocol (MCP) Asia Timur.'
        : 'Low-latency edge node inspecting Model Context Protocol (MCP) requests across East Asia.'
    },
    {
      id: 'sydney_pop',
      name: 'Sydney Pacific Hub',
      country: 'Australia',
      coords: [151.2093, -33.8688],
      type: 'edge_pop',
      status: 'active',
      pqcAlgorithm: 'ML-KEM-768',
      eventsPerSec: 11200,
      activeAttacksBlocked: 1430,
      description: isId 
        ? 'Simpul inspeksi postur cloud Oseania dengan sinkronisasi continuous compliance.'
        : 'Oceania posture inspection point with automated continuous compliance synchronization.'
    },
    {
      id: 'frankfurt_eu',
      name: 'Frankfurt EU Sentinel',
      country: 'Germany',
      coords: [8.6821, 50.1109],
      type: 'regional_sentinel',
      status: 'pqc_shielded',
      pqcAlgorithm: 'ML-DSA-87 Digital Signatures',
      eventsPerSec: 31200,
      activeAttacksBlocked: 6240,
      description: isId 
        ? 'Pusat verifikasi kepatuhan ISO 27001 dan gerbang enkripsi data lintas benua.'
        : 'ISO 27001 evidence verification hub and cross-continental quantum-safe enclave.'
    },
    {
      id: 'london_pop',
      name: 'London Financial Gate',
      country: 'United Kingdom',
      coords: [-0.1278, 51.5074],
      type: 'edge_pop',
      status: 'active',
      pqcAlgorithm: 'ML-KEM-768',
      eventsPerSec: 22100,
      activeAttacksBlocked: 3980,
      description: isId 
        ? 'Gerbang keamanan transaksi perbankan global dengan proteksi anti-HNDL.'
        : 'Global banking transaction security gateway equipped with anti-HNDL interception shields.'
    },
    {
      id: 'ashburn_us',
      name: 'Ashburn US-East Sentinel',
      country: 'United States',
      coords: [-77.4875, 39.0437],
      type: 'cloud_datacenter',
      status: 'pqc_shielded',
      pqcAlgorithm: 'NIST FIPS 203 Dual-Stack',
      eventsPerSec: 42500,
      activeAttacksBlocked: 8910,
      description: isId 
        ? 'Klaster analisis jalur serangan multi-cloud AWS/GCP/Azure terbesar NusaSec.'
        : 'Largest multi-cloud AWS/GCP/Azure attack path correlation supercluster.'
    },
    {
      id: 'dubai_hub',
      name: 'Dubai MENA Gateway',
      country: 'United Arab Emirates',
      coords: [55.2708, 25.2048],
      type: 'regional_sentinel',
      status: 'active',
      pqcAlgorithm: 'ML-KEM-768',
      eventsPerSec: 16700,
      activeAttacksBlocked: 2870,
      description: isId 
        ? 'Titik temu keamanan kedaulatan data Timur Tengah & koridor perbankan Syariah.'
        : 'Middle East sovereign data confluence & cross-border financial security corridor.'
    }
  ], [isId]);

  // Live Simulated Attack & Threat Mitigation Feed
  const [eventFeed, setEventFeed] = useState<SecurityEventStream[]>([
    {
      id: 'EVT-9041',
      timestamp: '20:55:12',
      origin: 'Frankfurt EU Sentinel',
      destination: 'Jakarta Sovereign Core (HQ)',
      originCoords: [8.6821, 50.1109],
      destCoords: [106.8456, -6.2088],
      vector: 'HNDL Harvest Intercept Attempt (RSA-2048)',
      threatLevel: 'CRITICAL',
      action: isId ? 'Dinetralkan oleh ML-KEM-768 Shield' : 'Neutralized by ML-KEM-768 Shield'
    },
    {
      id: 'EVT-9042',
      timestamp: '20:55:14',
      origin: 'Ashburn US-East Sentinel',
      destination: 'Singapore Regional Ingress',
      originCoords: [-77.4875, 39.0437],
      destCoords: [103.8198, 1.3521],
      vector: 'CVE-2024-3400 Ingress Bypass Probe',
      threatLevel: 'HIGH',
      action: isId ? 'Diblokir di WAF Edge Policy' : 'Blocked at WAF Edge Policy'
    },
    {
      id: 'EVT-9043',
      timestamp: '20:55:15',
      origin: 'Tokyo Cloud Edge Node',
      destination: 'Jakarta Sovereign Core (HQ)',
      originCoords: [139.6917, 35.6895],
      destCoords: [106.8456, -6.2088],
      vector: 'Prompt Injection Tool Exploit (MCP Agent)',
      threatLevel: 'CRITICAL',
      action: isId ? 'Isolasi Sandbox Otomatis' : 'Automated Sandbox Enforced'
    },
    {
      id: 'EVT-9044',
      timestamp: '20:55:16',
      origin: 'London Financial Gate',
      destination: 'Dubai MENA Gateway',
      originCoords: [-0.1278, 51.5074],
      destCoords: [55.2708, 25.2048],
      vector: 'Over-privileged IAM Role Impersonation',
      threatLevel: 'HIGH',
      action: isId ? 'GitOps PR Remediasi Dibuat' : 'GitOps PR Remediation Generated'
    }
  ]);

  // Rotational coordinates state
  const rotationRef = useRef<[number, number]>([ -105, -10 ]); // Center near Indonesia / SE Asia

  // D3 Globe Rendering Effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = 520;
    const radius = Math.min(width, height) / 2 - 24;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    svg.selectAll('*').remove();

    // Definitions for 3D Lighting & Cyber Gradients
    const defs = svg.append('defs');

    // 1. Globe Ambient Shadow & Specular Gradient
    const globeGrad = defs.append('radialGradient')
      .attr('id', 'globe-shading')
      .attr('cx', '35%')
      .attr('cy', '35%')
      .attr('r', '65%');
    globeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#0f172a');
    globeGrad.append('stop').attr('offset', '70%').attr('stop-color', '#050814');
    globeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#02040a');

    // 2. Atmosphere Halo Outer Glow
    const haloGrad = defs.append('radialGradient')
      .attr('id', 'atmosphere-halo')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    haloGrad.append('stop').attr('offset', '80%').attr('stop-color', 'transparent');
    haloGrad.append('stop').attr('offset', '94%').attr('stop-color', 'rgba(16, 185, 129, 0.25)');
    haloGrad.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(56, 189, 248, 0.4)');

    // 3. Node Filter Glow
    const nodeGlow = defs.append('filter')
      .attr('id', 'hub-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    nodeGlow.append('feGaussianBlur').attr('stdDeviation', '3.5').attr('result', 'blur');
    nodeGlow.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    // D3 Geo Orthographic Projection
    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate(rotationRef.current);

    const path = d3.geoPath().projection(projection);

    // Group Layers
    const gAtmosphere = svg.append('g').attr('class', 'atmosphere');
    const gGlobe = svg.append('g').attr('class', 'globe-body');
    const gGraticule = svg.append('g').attr('class', 'graticule');
    const gLandmass = svg.append('g').attr('class', 'landmass');
    const gArcs = svg.append('g').attr('class', 'threat-arcs');
    const gHubs = svg.append('g').attr('class', 'hubs');

    // Render 3D Atmosphere Outer Halo
    gAtmosphere.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius + 12)
      .attr('fill', 'url(#atmosphere-halo)')
      .attr('pointer-events', 'none');

    // Render Globe Sphere Background
    gGlobe.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius)
      .attr('fill', 'url(#globe-shading)')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1.5);

    // Graticule (Lat/Long Cyber Wireframe Grid)
    const graticule = d3.geoGraticule().step([20, 20]);
    const graticulePath = gGraticule.append('path')
      .datum(graticule)
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.75)
      .attr('stroke-opacity', 0.6)
      .attr('d', path);

    // Generate Natural Procedural Landmass Contours & Continents
    // High-fidelity GeoJSON representing key continents (Asia, Europe, Americas, Africa, Australia)
    const continentGeoJson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        // Southeast Asia & Indonesia Core
        {
          type: 'Feature',
          properties: { name: 'Indonesia & SE Asia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [95, 5], [105, 7], [115, 6], [125, 4], [135, -2], [141, -8], [130, -9], [120, -9], [110, -8], [100, -5], [95, 5]
            ]]
          }
        },
        // Asia Mainland & East Asia
        {
          type: 'Feature',
          properties: { name: 'Eurasia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [60, 40], [80, 55], [110, 65], [140, 60], [130, 40], [120, 30], [105, 20], [85, 20], [70, 25], [60, 40]
            ]]
          }
        },
        // Japan Archipelago
        {
          type: 'Feature',
          properties: { name: 'Japan' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [130, 32], [135, 35], [142, 42], [141, 38], [135, 33], [130, 32]
            ]]
          }
        },
        // Australia
        {
          type: 'Feature',
          properties: { name: 'Australia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [115, -22], [125, -15], [145, -15], [152, -28], [145, -38], [130, -35], [115, -30], [115, -22]
            ]]
          }
        },
        // Europe & Western Eurasia
        {
          type: 'Feature',
          properties: { name: 'Europe' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-10, 36], [0, 45], [15, 55], [30, 60], [35, 45], [25, 35], [5, 38], [-10, 36]
            ]]
          }
        },
        // North America
        {
          type: 'Feature',
          properties: { name: 'North America' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-125, 48], [-110, 60], [-80, 55], [-65, 45], [-75, 30], [-95, 25], [-115, 30], [-125, 48]
            ]]
          }
        },
        // Middle East & Africa
        {
          type: 'Feature',
          properties: { name: 'MENA & Africa' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-15, 30], [15, 35], [45, 30], [55, 20], [50, 10], [40, -10], [30, -30], [18, -34], [10, -10], [-15, 10], [-15, 30]
            ]]
          }
        }
      ]
    };

    const landmassPath = gLandmass.selectAll('path')
      .data(continentGeoJson.features)
      .enter()
      .append('path')
      .attr('fill', '#0f2438')
      .attr('stroke', '#325FE8')
      .attr('stroke-width', 0.75)
      .attr('stroke-opacity', 0.4)
      .attr('d', path as any);

    // Interactive Drag to Rotate Globe
    const drag = d3.drag<SVGSVGElement, unknown>()
      .on('drag', (event) => {
        const sensitivity = 0.4;
        const rotate = projection.rotate();
        const k = sensitivity / (radius / 100);
        rotationRef.current = [rotate[0] + event.dx * k, Math.max(-60, Math.min(60, rotate[1] - event.dy * k))];
        projection.rotate(rotationRef.current);
        updateGlobeElements();
      });

    svg.call(drag);

    // Update Globe Elements Function
    const updateGlobeElements = () => {
      graticulePath.attr('d', path);
      landmassPath.attr('d', path as any);

      // Render & Update Great Circle Threat Arcs
      const activeArcs = eventFeed.map(evt => ({
        type: 'LineString',
        coordinates: [evt.originCoords, evt.destCoords],
        event: evt
      }));

      const arcSelection = gArcs.selectAll<SVGPathElement, any>('path.threat-arc')
        .data(activeArcs, (d: any) => d.event.id);

      arcSelection.exit().remove();

      arcSelection.enter()
        .append('path')
        .attr('class', 'threat-arc')
        .merge(arcSelection)
        .attr('fill', 'none')
        .attr('stroke', (d: any) => d.event.threatLevel === 'CRITICAL' ? '#ef4444' : '#38bdf8')
        .attr('stroke-width', 1.8)
        .attr('stroke-dasharray', '5 3')
        .attr('stroke-opacity', 0.85)
        .attr('d', (d: any) => path(d as any));

      // Render & Update Security Hub Markers
      const hubSelection = gHubs.selectAll<SVGGElement, GlobalSecurityHub>('g.hub-node')
        .data(securityHubs, d => d.id);

      hubSelection.exit().remove();

      const hubEnter = hubSelection.enter()
        .append('g')
        .attr('class', 'hub-node')
        .attr('cursor', 'pointer')
        .on('click', (event, d) => {
          event.stopPropagation();
          setSelectedHub(d);
        });

      // Outer Pulse Ring
      hubEnter.append('circle')
        .attr('class', 'hub-pulse')
        .attr('r', 9)
        .attr('fill', 'none')
        .attr('stroke', d => d.type === 'hq_sovereign' ? '#325FE8' : d.status === 'pqc_shielded' ? '#38bdf8' : '#64748b')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.6);

      // Center Solid Dot
      hubEnter.append('circle')
        .attr('class', 'hub-center')
        .attr('r', 4.5)
        .attr('fill', d => d.type === 'hq_sovereign' ? '#325FE8' : d.status === 'pqc_shielded' ? '#38bdf8' : '#94a3b8')
        .attr('filter', 'url(#hub-glow)');

      // Label
      hubEnter.append('text')
        .attr('class', 'hub-label')
        .attr('dy', -8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-family', 'JetBrains Mono, monospace')
        .attr('font-weight', '700')
        .attr('fill', '#f8fafc')
        .text(d => d.name.split(' ')[0]);

      // Position update with clipping handling (hide if on back of globe)
      hubEnter.merge(hubSelection).each(function(d) {
        const coords = projection(d.coords);
        const geoCircle = d3.geoCircle().center(d.coords).radius(90);
        const isVisible = d3.geoContains({ type: 'Sphere' } as any, d.coords) && coords !== null;

        const el = d3.select(this);
        if (coords && isVisible) {
          // Check if coordinate is on the visible front hemisphere
          const r = projection.rotate();
          const p = d3.geoDistance(d.coords, [-r[0], -r[1]]);
          if (p < Math.PI / 2) {
            el.style('display', 'block')
              .attr('transform', `translate(${coords[0]}, ${coords[1]})`);
          } else {
            el.style('display', 'none');
          }
        } else {
          el.style('display', 'none');
        }
      });
    };

    updateGlobeElements();

    // D3 Timer for Continuous Smooth Rotation
    let timer: d3.Timer | null = null;
    if (isRotating) {
      timer = d3.timer(() => {
        rotationRef.current = [rotationRef.current[0] + rotationSpeed, rotationRef.current[1]];
        projection.rotate(rotationRef.current);
        updateGlobeElements();
      });
    }

    return () => {
      if (timer) timer.stop();
    };
  }, [isRotating, rotationSpeed, securityHubs, eventFeed]);

  // Periodic Telemetry Feed Generator
  useEffect(() => {
    const interval = setInterval(() => {
      const origins = securityHubs.filter(h => h.id !== 'jakarta_hq');
      const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
      const threats = [
        { v: 'ML-KEM Key Exchange Probe', l: 'SAFE' as const, a: isId ? 'Negosiasi FIPS 203 Sukses' : 'FIPS 203 Negotiation Confirmed' },
        { v: 'HNDL Packet Harvest Intercept', l: 'CRITICAL' as const, a: isId ? 'Dinetralkan NusaSec Vault' : 'Neutralized by NusaSec Vault' },
        { v: 'K8s Service Token Breakout', l: 'HIGH' as const, a: isId ? 'Isolasi eBPF Sensor' : 'eBPF Isolation Triggered' },
        { v: 'MCP Tool Ingress SSRF Attempt', l: 'CRITICAL' as const, a: isId ? 'Sandbox Guard Enforced' : 'Sandbox Guard Enforced' },
        { v: 'POJK 11 Sovereign Data Access Audit', l: 'SAFE' as const, a: isId ? 'Bukti Kriptografis Tercatat' : 'Immutable Audit Evidence Signed' }
      ];
      const randomThreat = threats[Math.floor(Math.random() * threats.length)];

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      const newEvent: SecurityEventStream = {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: timeStr,
        origin: randomOrigin.name,
        destination: 'Jakarta Sovereign Core (HQ)',
        originCoords: randomOrigin.coords,
        destCoords: [106.8456, -6.2088],
        vector: randomThreat.v,
        threatLevel: randomThreat.l,
        action: randomThreat.a
      };

      setEventFeed(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 4200);

    return () => clearInterval(interval);
  }, [securityHubs, isId]);

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden" id="global-intelligence">
      
      {/* Background Ambience Coordinates */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b25_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
              <Globe className="w-3.5 h-3.5" />
              <span>{isId ? 'INTELIJEN ANCAMAN GLOBAL & ENKLAVE KEDAULATAN' : 'GLOBAL THREAT INTELLIGENCE & SOVEREIGN ENCLAVES'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {isId ? (
                <>
                  Pertahanan Multi-Region & <span className="text-blue-600">Jangkauan Kriptografi Global</span>
                </>
              ) : (
                <>
                  Multi-Region Defense & <span className="text-blue-600">Global Quantum Telemetry</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId 
                ? 'Amati visualisasi bola dunia 3D interaktif D3.js. Pantau aliran mitigasi ancaman waktu nyata dari simpul edge global (Tokyo, Frankfurt, Ashburn) menuju enklave kedaulatan data di Jakarta.'
                : 'Explore interactive 3D rotating globe telemetry. Monitor real-time attack mitigation and quantum handshake streams from global edge PoPs towards sovereign datastores in Jakarta.'}
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              <div>
                <div className="text-xs font-bold text-slate-900 font-mono">186,100 /s</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono">{isId ? 'Event Global Diproses' : 'Global Events/Sec'}</div>
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900 font-mono">8 Global PoPs</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono">NIST FIPS 203 Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Globe + Live Security Event Stream Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3D D3.js Rotating Globe Canvas (7 Cols) */}
          <div 
            ref={containerRef}
            className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 relative shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[560px]"
          >
            {/* Top Toolbar (Rotation Controls) */}
            <div className="w-full flex items-center justify-between z-10 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Compass className="w-4 h-4 text-blue-600 animate-spin" />
                <span>{isId ? 'Rotasi 3D Orthographic • Drag untuk Memutar' : '3D Orthographic Projection • Drag to rotate'}</span>
              </div>

              {/* Pause / Play / Speed Controls */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
                >
                  {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
                </button>
                <button
                  onClick={() => setRotationSpeed(s => s === 0.25 ? 0.6 : 0.25)}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {rotationSpeed === 0.25 ? '1x SPEED' : '2x SPEED'}
                </button>
              </div>
            </div>

            {/* D3 Rendered SVG */}
            <svg 
              ref={svgRef} 
              className="w-full h-[500px] select-none block"
            />

            {/* Bottom Globe Legend */}
            <div className="w-full pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 border-t border-slate-900">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span>Sovereign HQ (Jakarta)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span>PQC Edge Sentinels</span>
                </div>
              </div>
              <span className="text-slate-500 hidden sm:inline">Click on any hub node to inspect details</span>
            </div>

          </div>

          {/* Right Column: Node Inspector & Real-Time Event Stream (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected Security Hub Details Panel */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider">
                    {isId ? 'Inspeksi Simpul Enklave' : 'Enclave Node Telemetry'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-blue-600 border border-blue-200">
                  {selectedHub ? selectedHub.country.toUpperCase() : 'JAKARTA CORE (DEFAULT)'}
                </span>
              </div>

              {selectedHub ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="text-lg font-bold font-display text-slate-900">{selectedHub.name}</div>
                    <div className="text-xs font-mono text-slate-500">Coords: [{selectedHub.coords[0].toFixed(2)}°, {selectedHub.coords[1].toFixed(2)}°]</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">{isId ? 'Algoritma Sandi' : 'PQC Cipher Suite'}</span>
                      <strong className="text-blue-600 text-xs">{selectedHub.pqcAlgorithm}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">{isId ? 'Throughput Event' : 'Event Velocity'}</span>
                      <strong className="text-slate-900 text-xs">{selectedHub.eventsPerSec.toLocaleString()} /s</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans p-3 rounded-xl bg-white border border-slate-200">
                    {selectedHub.description}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-bold font-display text-slate-900">Jakarta Sovereign Core (HQ)</div>
                    <div className="text-xs font-mono text-slate-500">Coords: [106.85° E, -6.21° S] • Indonesia</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">{isId ? 'Algoritma Sandi' : 'PQC Cipher Suite'}</span>
                      <strong className="text-blue-600 text-xs">ML-KEM-1024 / ML-DSA-87</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">{isId ? 'Total Mitigasi Aktif' : 'Active Mitigations'}</span>
                      <strong className="text-slate-900 text-xs">3,412 Threats Neutralized</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans p-3 rounded-xl bg-white border border-slate-200">
                    {isId 
                      ? 'Pusat komando kedaulatan data nasional yang menegakkan enkripsi tahan kuantum, pemantauan POJK 11, dan kepatuhan UU PDP.'
                      : 'National data sovereignty command center enforcing quantum-safe ciphers, POJK 11 mandates, and continuous compliance.'}
                  </p>
                </div>
              )}
            </div>

            {/* Real-time Threat Event Ticker Stream */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider">
                    {isId ? 'Aliran Ancaman Waktu Nyata' : 'Live Attack Mitigation Stream'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">REALTIME FEED</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs max-h-64 overflow-y-auto pr-1">
                {eventFeed.map((evt) => (
                  <div 
                    key={evt.id} 
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${evt.threatLevel === 'CRITICAL' ? 'bg-red-400 animate-ping' : evt.threatLevel === 'HIGH' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                        <strong className="text-slate-900">{evt.id}</strong>
                        <span className="text-slate-500">[{evt.timestamp}]</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        evt.threatLevel === 'CRITICAL'
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : evt.threatLevel === 'HIGH'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}>
                        {evt.threatLevel}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 font-sans">
                      <strong className="text-slate-800">{evt.origin.split(' ')[0]} → {evt.destination.split(' ')[0]}:</strong>{' '}
                      {evt.vector}
                    </div>

                    <div className="text-[10px] text-blue-600 flex items-center gap-1 pt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{evt.action}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {onOpenDemo && (
                <div className="pt-2">
                  <button
                    onClick={onOpenDemo}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-850 text-slate-800 border border-slate-300 hover:border-blue-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{isId ? 'Hubungkan Infrastruktur Multi-Cloud Anda' : 'Connect Your Multi-Cloud Infrastructure'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
