interface IUrlParams {
  url: string;
  headers?: Record<string, string>
  body?: any;
  responseType?: 'json' | 'blob' | 'text' | 'arrayBuffer';
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

class FetchService {

  private backUrl: string = process.env.BACK_HOST || 'http://localhost:3001';

  async request({url, headers = {}, body = {}, method, responseType = 'json' }: IUrlParams) {
    const urlHost = (this.backUrl + url);
    const currentUrl = method === 'GET' ? `${urlHost}?${new URLSearchParams(body).toString()}` : urlHost;

    const response = await fetch(currentUrl,{
      headers,
      method,
      body: method === 'GET' ? null : body,
    })

    return response[responseType]();
  }

  async postRequest(data: Omit<IUrlParams, 'method'>) {
    return this.request({...data, method: 'POST'})
  }

  async getRequest(data: Omit<IUrlParams, 'method'>) {
    return this.request({...data, method: 'GET'})
  }
};

export const FetchAgent = new FetchService();