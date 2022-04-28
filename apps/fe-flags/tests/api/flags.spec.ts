// API
import flagsEndpoints from "pages/api/v1/projects/[projectId]/environments/[envId]/flags";
import flagsByIdEndpoints from "pages/api/v1/projects/[projectId]/environments/[envId]/flags/[flagId]";
// Mocks
import { sessionMock } from "mocks/auth";
import {
  flagsMock,
  allFlagsByProjectAndEnvResponseMock,
  createFlagArgsMock,
  createFlagResponseMock,
  validUserInProjectResponseMock,
  getFlagByIdResponseMock,
  updateFlagByIdResponseMock,
  updateFlagByIdArgsMock,
  deleteFlagByIdResponseMock,
} from "mocks/flags";
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
    findFirst: jest.fn(() => getFlagByIdResponseMock),
    create: jest.fn(() => createFlagResponseMock),
    update: jest.fn(() => updateFlagByIdResponseMock),
    delete: jest.fn(() => deleteFlagByIdResponseMock),
  },
  environment: {
    findMany: jest.fn(() => allFlagsByProjectAndEnvResponseMock),
  },
  project: {
    findFirst: jest.fn(() => validUserInProjectResponseMock),
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

  test("Should create new flag from POST /v1/api/projects/${projectId}/environments/${envId}/flags", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {
        projectId: "cl2aogaew00926juehs2ecs2t",
        env: "cl2aoghvp01596juek134uhfs",
      },
      // @ts-ignore
      body: JSON.stringify(createFlagArgsMock),
    });

    await flagsEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        flag: createFlagResponseMock,
      })
    );
  });
});

describe("Flags by Id API Endpoints Tests", () => {
  test("Should get error for not supporting HTTP Method", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await flagsByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(methodNotAllowedMock)
    );
  });

  test("Should get all flags from GET /v1/api/projects/${projectId}/environments/${envId}/flags/${flagId}", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        projectId: "cl1l86cxb00790zuey3az0e0d",
        envId: "cl2aoghvp01596juek134uhfs",
        flagId: "cl2aoghvp01596juek13sdfdsf",
      },
    });

    await flagsByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(getFlagByIdResponseMock)
    );
  });

  test("Should update flag by id from PUT /v1/api/projects/${projectId}/environments/${envId}/flags/${flagId}", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: {
        projectId: "cl2aogaew00926juehs2ecs2t",
        envId: "cl1l86cxb00790zuey3az884",
        flagId: "cl2aoghvp01596juek13sdfdsf",
      },
      // @ts-ignore
      body: JSON.stringify(updateFlagByIdArgsMock),
    });

    await flagsByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(updateFlagByIdResponseMock)
    );
  });

  test("Should delete flag by id from PUT /v1/api/projects/${projectId}/environments/${envId}/flags/${flagId}", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        projectId: "cl2aogaew00926juehs2ecs2t",
        envId: "cl1l86cxb00790zuey3az884",
        flagId: "cl2aoghvp01596juek13sdfdsf",
      },
    });

    await flagsByIdEndpoints(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(deleteFlagByIdResponseMock)
    );
  });
});
