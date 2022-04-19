// API
import environmentsEndpoints from "pages/api/v1/projects/[projectId]/environments";
// import projectByIdEndpoints from "pages/api/v1/projects/[projectId]";
// Mocks
import { sessionMock } from "mocks/auth";
import {
  environmentsMock,
  allEnvironmentsResponseMock,
} from "mocks/environments";
import { methodNotAllowedMock } from "mocks/http";
// Utils
import { createMocks } from "node-mocks-http";

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => sessionMock),
}));

jest.mock("libs/prisma/index", () => ({
  // @ts-ignore
  ...jest.requireActual("libs/prisma/index"),
  project: {
    findFirst: jest.fn(() => {
      environments: [];
    }),
  },
}));

describe("Environments API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await environmentsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get project by id from GET /v1/api/projects/[projectId]/environments", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { projectId: "cl1l86cxb00790zuey3az0e0d" },
    });

    await environmentsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ environments: [] })
    );
  });
});

/* describe("Project by Id API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });


}); */
