// API
import projectEndpoints from "pages/api/v1/projects";
import projectByIdEndpoints from "pages/api/v1/projects/[id]";
// Mocks
import { sessionMock } from "mocks/auth";
import {
  projectsMock,
  createProjectArgsMock,
  projectMock,
  projectsOnUsersMock,
} from "mocks/projects";
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
  project: {
    findMany: jest.fn(() => projectsMock),
    create: jest.fn(() => projectMock),
    findUnique: jest.fn(() => projectMock),
    update: jest.fn(() => projectMock),
    delete: jest.fn(() => projectMock),
  },
  projectsOnUsers: {
    create: jest.fn(() => projectsOnUsersMock),
  },
}));

describe("Projects API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    await projectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all projects from GET /v1/api/projects", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await projectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ projects: projectsMock })
    );
  });

  test("Should create new project from POST /v1/api/projects", async () => {
    const { req, res } = createMocks({
      method: "POST",
      // @ts-ignore
      body: JSON.stringify(createProjectArgsMock),
    });

    await projectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        project: projectMock,
        connection: projectsOnUsersMock,
      })
    );
  });
});

describe("Project by Id API Endpoints Tests", () => {
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

  test("Should get project by id from GET /v1/api/projects/[id]", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: "cl1l86cxb00790zuey3az0e0d" },
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });

  test("Should update project by id from PUT /v1/api/projects/[id]", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: "cl1l86cxb00790zuey3az0e0d" },
      body: {
        name: "Nice new project",
        projectId: "cl24vhr5y050191wocdzfps09",
      },
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });

  test("Should delete project by id from DELETE /v1/api/projects/[id]", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: { id: "cl1l86cxb00790zuey3az0e0d" },
    });

    await projectByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ project: projectMock })
    );
  });
});
