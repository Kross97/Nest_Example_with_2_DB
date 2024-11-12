interface IUrlParams {
  url: string;
  headers?: Record<string, string>
  body?: any;
  responseType?: 'json' | 'blob' | 'text' | 'arrayBuffer';
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

class FetchService {

  private backUrl: string = process.env.BACK_HOST || 'http://localhost:3001';

  async request({ url, headers = {}, body = {}, method, responseType = 'json' }: IUrlParams) {
    const urlHost = (this.backUrl + url);
    const currentHeaders = (responseType === 'json' ? { 'content-type': 'application/json;', ...headers} : headers) as Record<string, string>;
    const currentUrl = method === 'GET' ? `${urlHost}?${new URLSearchParams(body).toString()}` : urlHost;

    const response = await fetch(currentUrl, {
      headers: currentHeaders,
      method,
      body: method === 'GET' ? null : body,
    });

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength) {
      return response[responseType]();
    }
  }

  async postRequest(data: Omit<IUrlParams, 'method'>) {
    return this.request({ ...data, method: 'POST' });
  }

  async getRequest(data: Omit<IUrlParams, 'method'>) {
    return this.request({ ...data, method: 'GET' });
  }

  async putRequest(data: Omit<IUrlParams, 'method'>) {
    return this.request({ ...data, method: 'PUT' });
  }
};

export const FetchAgent = new FetchService();