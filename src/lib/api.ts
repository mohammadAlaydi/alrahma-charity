import { getSession } from 'next-auth/react';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const session = await getSession();
      if (session && (session as any).access_token) {
        headers['Authorization'] = `Bearer ${(session as any).access_token}`;
      }
    } catch (error) {
      console.warn('Failed to get session for API call:', error);
    }

    return headers;
  }

  async get(endpoint: string) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async post(endpoint: string, data?: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async put(endpoint: string, data?: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async patch(endpoint: string, data?: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json().catch(() => ({}));
  }
}

export const apiClient = new ApiClient();