// @ts-nocheck
import { FetchAgent } from "../../../src/FetchService";
import Mock = jest.Mock;

declare const fetch: Mock;

describe("Тестирование FetchService", () => {
  it("Тест GET запросов", () => {
    FetchAgent.getRequest({
      url: "/user",
      headers: {
        "x-test-header": "test",
      },
    });

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/^http:\/\/[^:]+:\d{4}\/user/);
    expect(fetch.mock.calls[0][1].body).toBeNull();
    expect(fetch.mock.calls[0][1].credentials).toMatch("include");
    expect(fetch.mock.calls[0][1].method).toMatch("GET");
    expect(fetch.mock.calls[0][1].headers["x-test-header"]).toMatch("test");
  });

  it("Тест POST запроса", () => {
    FetchAgent.postRequest({
      url: "/user",
      body: {
        prop: "props",
      },
    });

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/^http:\/\/[^:]+:\d{4}\/user/);
    expect(fetch.mock.calls[0][1].body.prop).toBe("props");
    expect(fetch.mock.calls[0][1].credentials).toMatch("include");
    expect(fetch.mock.calls[0][1].method).toMatch("POST");
  });
});
