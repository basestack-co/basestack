import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  projectsMock,
  createProjectArgsMock,
  createProjectResponseMock,
  projectMock,
  updateProjectArgsMock,
  deleteProjectArgsMock,
} from "mocks/projects";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import {
  projectsApi,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
  useDeleteProjectByIdMutation,
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
 * ENDPOINTS
 */

describe("Projects Endpoint Tests", () => {
  const storeRef = setupApiStore(projectsApi, {});
  fetchMock.mockResponse(JSON.stringify(projectsMock));

  test("Should getProjects successful", () => {
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
  test("Should getProjects unsuccessful", () => {
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

  test("Should createProject successful", () => {
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

  test("Should getProjectById successful", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify(projectMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          projectsApi.endpoints.getProjectById.initiate({
            projectId: "cl1l86cxb00790zuey3az0e0d",
          })
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(projectMock);
        })
    );
  });

  test("Should updateProjectById successful", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify(projectMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          projectsApi.endpoints.updateProjectById.initiate(
            updateProjectArgsMock
          )
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(projectMock);
        })
    );
  });

  test("Should deleteProjectById successful", () => {
    const storeRef = setupApiStore(projectsApi, {});
    fetchMock.mockResponse(JSON.stringify(projectMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          projectsApi.endpoints.deleteProjectById.initiate(
            deleteProjectArgsMock
          )
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(projectMock);
        })
    );
  });
});

/**
 * HOOKS
 */

describe("Projects Endpoint Hooks Tests", () => {
  it("Should use useGetProjectsQuery with Success", async () => {
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

  it("Should use useGetProjectsQuery with Error", async () => {
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

  it("Should use useCreateProjectMutation with Success", async () => {
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

  it("Should use useCreateProjectMutation with Error", async () => {
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

  it("Should use useUpdateProjectByIdMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(updateProjectArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateProjectByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [updateProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateProject(updateProjectArgsMock);
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

  it("Should use useUpdateProjectByIdMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateProjectByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [updateProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateProject(updateProjectArgsMock);
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

  it("Should use useDeleteProjectByIdMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(deleteProjectArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useDeleteProjectByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [deleteProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void deleteProject(deleteProjectArgsMock);
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

  it("Should use useDeleteProjectByIdMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useDeleteProjectByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [deleteProject, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void deleteProject(deleteProjectArgsMock);
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
