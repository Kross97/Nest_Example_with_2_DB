import { getCurrentClusterPort, getTokenJwt } from "../provider/AllProvider";
import { errorHandler } from "./utils/errorHandler";
import { TTypesDataBases } from "../provider/types";

interface IUrlParams {
  url: string;
  headers?: Record<string, string>;
  body?: any;
  requestType?: "none" | "json";
  responseType?: "json" | "blob" | "text" | "arrayBuffer";
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

type ResponseType = Exclude<IUrlParams["responseType"], undefined>;

const dispatcherHeaders = {
  json: { "content-type": "application/json; charset=utf-8" },
  none: {},
};

const dispatcherBody = {
  json: (body: any) => JSON.stringify(body),
  none: (body: any) => body,
};

const dispatcherResponses: Record<string, string> = {
  "application/json": "json",
  "text/html": "text",
};

const initAuthHeader = () => ({ Authorization: `Bearer ${getTokenJwt()}` });

class FetchService {
  public typeDb: TTypesDataBases = "postgres";

  private mainPort = process.env.MAIN_BACK_PORT || 3001;

  public backPort = getCurrentClusterPort() || this.mainPort;

  /**
   * Конфиг портов для переключения между Nest и Express
   * */
  public portsConfig: Record<string, number> = {};

  private backUrl: () => string = () => `http://localhost:${this.mainPort}`;

  public setBackPort(newPort: number) {
    this.backPort = newPort;
  }

  public rollBackPort = () => {
    this.backPort = this.mainPort;
  };

  /**
   * Для перевода запросов на mongo или postgress
   * */
  private buildQueryDbType(currentUrl: string) {
    return currentUrl.includes("?") ? `${currentUrl}&db=${this.typeDb}` : `${currentUrl}?db=${this.typeDb}`;
  }

  /**
   * Для перевода запросов разных модулей на порты express или nest
   * */
  private reBuildWithConfigPorts = (url: string) => {
    const urlWithDb = this.buildQueryDbType(url);
    const currentUrl = new URL(urlWithDb);
    const [, controller] = currentUrl.pathname.split("/");

    if (controller in this.portsConfig) {
      currentUrl.port = String(this.portsConfig[controller]);
    }
    console.log("currentUrl", currentUrl, "config", this.portsConfig);

    return currentUrl.toString();
  };

  async request<T = any>({
    url,
    headers = {},
    body = "",
    method,
    requestType = "none",
    responseType,
  }: // @ts-ignore
  IUrlParams): Promise<T> {
    const urlHost = this.backUrl() + (url.startsWith("/") ? url : `/${url}`);
    const currentHeaders = { ...headers, ...dispatcherHeaders[requestType], ...initAuthHeader() };
    const currentUrl = method === "GET" && body ? `${urlHost}?${new URLSearchParams(body).toString()}` : urlHost;

    const response = await fetch(this.reBuildWithConfigPorts(currentUrl), {
      headers: currentHeaders,
      method,
      body: method === "GET" ? null : dispatcherBody[requestType](body),
      credentials: "include",
    });

    if (response.ok) {
      const contentLength = Number(response.headers.get("content-length") || 0);
      const contentType = response.headers.get("content-type");
      const dispatcherType = contentType ? dispatcherResponses[contentType.split(";")[0]] : null;
      const currentResponseType = responseType || dispatcherType || "text";
      try {
        return response[currentResponseType as ResponseType]();
      } catch (err) {
        console.log("Проблема при парсинге тела");
      }
    } else {
      await errorHandler(response);
    }
  }

  async postRequest<T = any>(data: Omit<IUrlParams, "method">) {
    return await this.request<T>({ ...data, method: "POST" });
  }

  async getRequest<T = any>(data: Omit<IUrlParams, "method">) {
    return await this.request<T>({ ...data, method: "GET" });
  }

  async putRequest<T = any>(data: Omit<IUrlParams, "method">) {
    return await this.request<T>({ ...data, method: "PUT" });
  }

  async deleteRequest<T = any>(data: Omit<IUrlParams, "method">) {
    return await this.request<T>({ ...data, method: "DELETE" });
  }
}

export const FetchAgent = new FetchService();
