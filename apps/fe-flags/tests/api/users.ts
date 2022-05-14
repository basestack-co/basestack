// API
import usersByProjectEndpoints from "pages/api/v1/projects/[projectId]/users";
import usersEndpoints from "pages/api/v1/users";
// Mocks
import { sessionMock } from "mocks/auth";
import { usersMock } from "mocks/users";
import { methodNotAllowedMock } from "mocks/http";
// Utils
import { createMocks } from "node-mocks-http";

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => sessionMock),
}));

jest.mock("libs/prisma/index", () => ({
  // @ts-ignore
  ...jest.requireActual("libs/prisma/index"),
  user: {
    findMany: jest.fn(() => usersMock),
  },
}));

describe("Users by Project API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await usersByProjectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all users by Project from GET /v1/api/projects/${projectId}/users", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
      },
    });

    await usersByProjectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ users: usersMock })
    );
  });
});

describe("Users API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await usersEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all users by search from GET /v1/api/users?name=", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        name: "amaral",
      },
    });

    await usersEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ users: usersMock })
    );
  });
});
