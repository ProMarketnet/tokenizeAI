// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  WEBSOCKET_URL: process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3001',
  TIMEOUT: 30000, // 30 seconds
};

// Blockchain Configuration
export const BLOCKCHAIN_CONFIG = {
  NETWORKS: {
    ETHEREUM_MAINNET: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/',
      explorerUrl: 'https://etherscan.io',
    },
    ETHEREUM_SEPOLIA: {
      chainId: 11155111,
      name: 'Ethereum Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/',
      explorerUrl: 'https://sepolia.etherscan.io',
    },
    POLYGON: {
      chainId: 137,
      name: 'Polygon',
      rpcUrl: 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
    },
    BASE: {
      chainId: 8453,
      name: 'Base',
      rpcUrl: 'https://mainnet.base.org',
      explorerUrl: 'https://basescan.org',
    },
  },
  DEFAULT_NETWORK: process.env.REACT_APP_BLOCKCHAIN_NETWORK || 'ethereum-sepolia',
  GAS_LIMITS: {
    TOKEN_DEPLOY: 2000000,
    TOKEN_TRANSFER: 21000
