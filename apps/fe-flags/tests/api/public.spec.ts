// API
import flagsEndpoints from "pages/api/v1/[projectKey]/[envKey]/flags";
// Mocks
import { sessionMock } from "mocks/auth";
import { flagsMock } from "mocks/flags";
import { methodNotAllowedMock } from "mocks/http";
// Utils
import { createMocks } from "node-mocks-http";
// import { prismaMock } from "../singleton";
// Services

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => sessionMock),
}));

jest.mock("libs/prisma/index", () => ({
  // @ts-ignore
  ...jest.requireActual("libs/prisma/index"),
  flag: {
    findMany: jest.fn(() => flagsMock),
  },
}));

describe("Flags Public API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await flagsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all flags from GET /v1/api/[projectKey]/[envKey]/flags", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        projectKey: "cl1l86cxb00790zuey3az0e0d",
        envKey: "cl1l86cxb00790zuey3az884",
      },
    });

    await flagsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ flags: flagsMock })
    );
  });
});
