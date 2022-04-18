import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  projectsMock,
  createProjectArgsMock,
  createProjectResponseMock,
} from "mocks/projects";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { baseUrl } from "../utils";
// Queries
import {
  projectsApi,
  useGetProjectsQuery,
  useCreateProjectMutation,
} from "../projects";

const updateTimeout = 5000;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const storeRef = setupApiStore(projectsApi, {});
  return <Provider store={storeRef.store}>{children}</Provider>;
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

/**
 * HOOKS
 */

describe("useGetProjectsQuery", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify(projectsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetProjectsQuery(undefined),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

  it("Internal Server Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetProjectsQuery(undefined),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isError).toBe(true);
  });
});

describe("useCreateProjectMutation", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify(createProjectArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateProjectMutation(undefined),
      {
        wrapper,
      }
    );
    const [createProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createProject(createProjectArgsMock);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: updateTimeout });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });

  it("Internal Server Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateProjectMutation(undefined),
      {
        wrapper,
      }
    );
    const [createProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createProject(createProjectArgsMock);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: updateTimeout });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isError).toBe(true);
  });
});

/**
 * ENDPOINTS
 */

describe("GetAllProjects Endpoint Tests", () => {
  const storeRef = setupApiStore(projectsApi, {});
  fetchMock.mockResponse(JSON.stringify(projectsMock));

  test("request is correct", () => {
    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(projectsApi.endpoints.getProjects.initiate(undefined))
        .then(() => {
          expect(fetchMock).toBeCalledTimes(1);
          const { method, headers, url } = fetchMock.mock
            .calls[0][0] as Request;

          // @ts-ignore
          const authorization = headers.get(Headers.Authorization);

          expect(method).toBe("GET");
          expect(url).toBe(`${baseUrl}/projects`);
          expect(authorization).toBeNull();
        })
    );
  });
  test("successful response", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify(projectsMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(projectsApi.endpoints.getProjects.initiate(undefined))
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(projectsMock);
        })
    );
  });
  test("unsuccessful response", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(projectsApi.endpoints.getProjects.initiate(undefined))
        .then((action: any) => {
          const {
            status,
            error: { error },
            isError,
          } = action;
          expect(status).toBe("rejected");
          expect(isError).toBe(true);
          expect(error).toBe("Error: Internal Server Error");
        })
    );
  });
});

describe("CreateProject Endpoint Tests", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify({}));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          projectsApi.endpoints.createProject.initiate(createProjectArgsMock)
        )
        .then(() => {
          expect(fetchMock).toBeCalledTimes(1);
          const request = fetchMock.mock.calls[0][0] as Request;
          const { method, headers, url } = request;

          void request.json().then((data) => {
            expect(data).toStrictEqual(createProjectResponseMock);
          });

          expect(method).toBe("POST");
          expect(url).toBe(`${baseUrl}/projects`);
        })
    );
  });
  test("successful response", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify(createProjectResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          projectsApi.endpoints.createProject.initiate(createProjectArgsMock)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(createProjectResponseMock);
        })
    );
  });
});
