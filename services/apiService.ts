const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // AI Chat endpoints
  async sendMessage(message: string, context?: any): Promise<ApiResponse<any>> {
    return this.request('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  // Asset tokenization endpoints
  async createTokenization(assetData: any): Promise<ApiResponse<any>> {
    return this.request('/api/tokenization/create', {
      method: 'POST',
      body: JSON.stringify(assetData),
    });
  }

  async getTokenizationStatus(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/tokenization/status/${id}`);
  }

  // Legal document endpoints
  async generateDocuments(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/legal/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDocument(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/legal/document/${id}`);
  }

  // Compliance endpoints
  async checkCompliance(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/compliance/check', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Blockchain endpoints
  async deployContract(contractData: any): Promise<ApiResponse<any>> {
    return this.request('/api/blockchain/deploy', {
      method: 'POST',
      body: JSON.stringify(contractData),
    });
  }

  async getContractStatus(address: string): Promise<ApiResponse<any>> {
    return this.request(`/api/blockchain/contract/${address}`);
  }

  // Trading endpoints
  async getMarketData(tokenAddress: string): Promise<ApiResponse<any>> {
    return this.request(`/api/trading/market/${tokenAddress}`);
  }

  async createOrder(orderData: any): Promise<ApiResponse<any>> {
    return this.request('/api/trading/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // User management
  async getUserProfile(): Promise<ApiResponse<any>> {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // KYC/AML
  async submitKyc(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/kyc/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getKycStatus(): Promise<ApiResponse<any>> {
    return this.request('/api/kyc/status');
  }
}

export const apiService = new ApiService();
export default apiService;
