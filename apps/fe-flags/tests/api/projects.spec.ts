// API
import projectEndpoints from "pages/api/v1/projects";
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
