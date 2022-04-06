// API
import projectEndpoints from "pages/api/v1/projects";
// Mocks
import { sessionMock, userIdMock } from "mocks/auth";
import { projectsMock } from "mocks/projects";
import { methodNotAllowedMock } from "mocks/http";
// Utils
import { createMocks } from "node-mocks-http";
// import { prismaMock } from "../singleton";
// Services
import { getAllProjects } from "../projects";

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => sessionMock),
}));

jest.mock("libs/prisma/index", () => ({
  // @ts-ignore
  ...jest.requireActual("libs/prisma/index"),
  project: {
    findMany: jest.fn(() => projectsMock),
  },
}));

describe("Projects Prisma Service Tests", () => {
  test("should get all the projects by userId ", async () => {
    const { res } = createMocks({
      method: "GET",
    });

    // expect(getAllProjects(userIdMock, res)).toEqual(projectsMock);

    // prismaMock.project.findMany.mockResolvedValue(projectsMock);

    /* await expect(getAllProjects(userIdMock, res)).resolves.toEqual(
      projectsMock
    ); */
  });
});

describe.skip("Projects API Endpoints Tests", () => {
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

  test("Should get all projects from /v1/api/projects", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await projectEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ projects: projectsMock })
    );
  });
});
