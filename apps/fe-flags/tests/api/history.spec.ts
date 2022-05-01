// API
import historyEndpoints from "pages/api/v1/projects/[projectId]/history";
// Mocks
import { sessionMock } from "mocks/auth";
import { historyByProjectIdResponseMock } from "mocks/history";
import { methodNotAllowedMock } from "mocks/http";
// Utils
import { createMocks } from "node-mocks-http";

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => sessionMock),
}));

jest.mock("libs/prisma/index", () => ({
  // @ts-ignore
  ...jest.requireActual("libs/prisma/index"),
  history: {
    findMany: jest.fn(() => historyByProjectIdResponseMock),
  },
}));

describe("History API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await historyEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all history by project Id from GET /v1/api/projects/${projectId}/history", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
      },
    });

    await historyEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ history: historyByProjectIdResponseMock })
    );
  });
});
