export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  blocks?: InfoBlock[];
  buttons?: MessageButton[];
  documents?: Document[];
}

export interface InfoBlock {
  id: string;
  type: 'asset' | 'liquidity' | 'legal' | 'compliance' | 'token';
  title: string;
  data: Record<string, any>;
  status: 'incomplete' | 'complete' | 'verified';
  sourceNumber?: number;
}

export interface MessageButton {
  id: string;
  text: string;
  value: string;
  icon?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'draft' | 'ready' | 'signed';
  url?: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentStep: string;
}

export interface AssetData {
  type: 'shares' | 'real_estate' | 'partnership' | 'other';
  company?: string;
  quantity?: number;
  currentValue?: number;
  description?: string;
}

export interface LiquidityGoals {
  amount: number;
  timeline: string;
  purpose: string;
  keepRemaining: boolean;
  targetPercentage?: number;
}

export interface LegalStructure {
  entityType: string;
  jurisdiction: string;
  tokenStandard: string;
  taxStatus: string;
  purpose: string;
}

export interface ComplianceStatus {
  isAccredited: boolean;
  buyerType: 'accredited' | 'retail' | 'mixed';
  maxInvestors: number;
  exemption: string;
  registrationRequired: boolean;
}

export interface TokenDesign {
  totalSupply: number;
  tokenToAssetRatio: string;
  initialSale: number;
  revenueSharing: boolean;
  transferRestrictions: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isAccredited: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected';
  walletAddress?: string;
}

export interface ContractDeployment {
  id: string;
  status: 'pending' | 'deploying' | 'deployed' | 'failed';
  contractAddress?: string;
  transactionHash?: string;
  network: string;
  gasUsed?: number;
  deploymentCost?: string;
}

export interface TradingOrder {
  id: string;
  type: 'buy' | 'sell';
  tokenAddress: string;
  quantity: number;
  price: number;
  status: 'pending' | 'filled' | 'cancelled';
  timestamp: Date;
}

export interface MarketData {
  tokenAddress: string;
  price: number;
  volume24h: number;
  priceChange24h: number;
  marketCap: number;
  totalSupply: number;
  circulatingSupply: number;
}
