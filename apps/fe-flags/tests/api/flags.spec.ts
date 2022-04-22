// API
import flagsEndpoints from "pages/api/v1/projects/[projectId]/environments/[envId]/flags";
import flagsByIdEndpoints from "pages/api/v1/projects/[projectId]/environments/[envId]/flags/[flagId]";
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

describe("Flags API Endpoints Tests", () => {
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

  test("Should get all flags from GET /v1/api/projects/${projectId}/environments/${envId}/flags", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
        envId: "cl1l86cxb00790zuey3az884",
      },
    });

    await flagsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ flags: flagsMock })
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

  test("Should get project by id from GET /v1/api/projects/[projectId]", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { projectId: "cl1l86cxb00790zuey3az0e0d" },
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });

  test("Should update project by id from PUT /v1/api/projects/[projectId]", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: { projectId: "cl1l86cxb00790zuey3az0e0d" },
      // @ts-ignore
      body: JSON.stringify({
        name: "Nice new project",
      }),
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });

  test("Should delete project by id from DELETE /v1/api/projects/[projectId]", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: { projectId: "cl1l86cxb00790zuey3az0e0d" },
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });
}); */
