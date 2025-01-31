import "./local_storage_setup";

Object.defineProperty(global, "fetch", {
  writable: true,
  value: jest.fn(() =>
    Promise.resolve({
      headers: {
        get: jest.fn(() => "application/json"),
      },
      ok: true,
      text: jest.fn(() => Promise.resolve()),
      json: jest.fn(() => Promise.resolve()),
    })
  ),
});
