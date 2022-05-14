// API
import projectEndpoints from "pages/api/v1/projects";
import projectByIdEndpoints from "pages/api/v1/projects/[projectId]";
import flagsByProjectEndpoints from "pages/api/v1/projects/[projectId]/flags";
// Mocks
import { sessionMock } from "mocks/auth";
import {
  projectsMock,
  createProjectArgsMock,
  projectMock,
  projectsOnUsersMock,
} from "mocks/projects";
/* import {
  getAllFlagsByProjectArgsMock,
  getAllFlagsByProjectResponseMock,
} from "mocks/flags"; */
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
    findFirst: jest.fn(() => projectMock),
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
});

describe("Flags by Project Id API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await flagsByProjectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });
});
