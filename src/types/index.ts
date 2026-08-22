export type PageRoute = 
  | 'home'
  | 'platform'
  | 'solutions'
  | 'ai'
  | 'pricing'
  | 'resources'
  | 'security'
  | 'company'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'cookie-preferences'
  | 'security-architecture';

export type PlatformSubTab = 
  | 'security'
  | 'cloud'
  | 'identity'
  | 'risk'
  | 'compliance'
  | 'data-intelligence'
  | 'crypto-pqc'
  | 'migration'
  | 'ai';

export type SolutionSubTab = 
  | 'enterprise'
  | 'cloud-security'
  | 'security-operations'
  | 'compliance'
  | 'crypto-agility'
  | 'pqc-migration'
  | 'data-security';

export type ResourceCategory = 'all' | 'news' | 'research' | 'documentation' | 'case-studies' | 'whitepapers' | 'guides';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'news' | 'research' | 'whitepapers' | 'case-studies' | 'guides';
  date: string;
  readTime: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  content: string[];
  featured?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  specs: {
    cloudAssets: string;
    complianceFrameworks: string;
    pqcScanFrequency: string;
    aiQueries: string;
    retention: string;
    support: string;
  };
  ctaLabel: string;
}

export interface SecurityStatusItem {
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
  latency: string;
  region: string;
}

export interface PqcAlgorithm {
  name: string;
  standard: string;
  type: 'KEM' | 'Signature' | 'Stateful Hash';
  securityLevel: string;
  nusaSecStatus: 'SUPPORTED' | 'PRODUCTION_READY' | 'HYBRID_MODE';
  description: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  visibilityTier?: 'PUBLIC_GENERAL' | 'PUBLIC_SPECIFIC';
}
