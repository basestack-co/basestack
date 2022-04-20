// API
import environmentsEndpoints from "pages/api/v1/projects/[projectId]/environments";
import environmentByIdEndpoints from "pages/api/v1/projects/[projectId]/environments/[envId]";
// Mocks
import { sessionMock } from "mocks/auth";
import {
  environmentMock,
  createEnvironmentArgsMock,
  projectEnvironmentResponseMock,
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
    findFirst: jest.fn(() => projectEnvironmentResponseMock),
  },
  environment: {
    create: jest.fn(() => environmentMock),
    update: jest.fn(() => ({
      name: "environment1",
    })),
    environment: jest.fn(() => environmentMock),
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

  test.skip("Should create new environment by project from POST /v1/api/projects/[projectId]/environments", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: { projectId: "cl1l86cxb00790zuey3az0e0d" },
      // @ts-ignore
      body: JSON.stringify(createEnvironmentArgsMock),
    });

    await environmentsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        environment: environmentMock,
      })
    );
  });
});

describe("Project by Id API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await environmentByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test.skip("Should get project by id from PUT /v1/api/projects/[projectId]/environments/[envId]", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
        envId: "cl1l86cxb00790zuey3az884",
      },
      // @ts-ignore
      body: JSON.stringify({ name: "environment1" }),
    });

    await environmentByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        environment: {
          name: "environment1",
        },
      })
    );
  });

  test.skip("Should delete project by id from DELETE /v1/api/projects/[projectId]/environments/[envId]", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
        envId: "cl1l86cxb00790zuey3az884",
      },
    });

    await environmentByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(expect.objectContaining({}));
  });
});
