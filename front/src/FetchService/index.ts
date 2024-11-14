import {  getTokenJwt } from '../provider/AllProvider';
import { errorHandler } from './utils/errorHandler';

interface IUrlParams {
  url: string;
  headers?: Record<string, string>
  body?: any;
  requestType?: 'none' | 'json';
  responseType?: 'json' | 'blob' | 'text' | 'arrayBuffer';
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

const dispatcherHeaders = {
  'json': { 'content-type': 'application/json; charset=utf-8' },
  'none': {}
};

const dispatcherBody = {
  'json': (body: any) => JSON.stringify(body),
  'none': (body: any) => body,
}

const initAuthHeader = () => ({ 'Authorization': `Bearer ${getTokenJwt()}`})

class FetchService {

  private backUrl: string = process.env.BACK_HOST || 'http://localhost:3001';

  async request<T = any>({ url, headers = {}, body = '', method, requestType = 'none', responseType = 'json' }: IUrlParams) {
    const urlHost = (this.backUrl + (url.startsWith('/') ? url : `/${url}`));
    const currentHeaders = {...headers, ...dispatcherHeaders[requestType], ...initAuthHeader()};
    const currentUrl = method === 'GET' ? `${urlHost}?${new URLSearchParams(body).toString()}` : urlHost;

    const response = await fetch(currentUrl, {
      headers: currentHeaders,
      method,
      body: method === 'GET' ? null : dispatcherBody[requestType](body),
      credentials: 'include'
    });

    if(response.ok) {
      const contentLength = Number(response.headers.get('content-length') || 0);
      if (contentLength) {
        return response[responseType]();
      }
    } else {
      errorHandler(response);
    }
  }

  async postRequest<T = any>(data: Omit<IUrlParams, 'method'>) {
    return this.request<T>({ ...data, method: 'POST' });
  }

  async getRequest<T = any>(data: Omit<IUrlParams, 'method'>) {
    return this.request<T>({ ...data, method: 'GET' });
  }

  async putRequest<T = any>(data: Omit<IUrlParams, 'method'>) {
    return this.request<T>({ ...data, method: 'PUT' });
  }
};

export const FetchAgent = new FetchService();