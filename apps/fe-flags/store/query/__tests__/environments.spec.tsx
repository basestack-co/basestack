import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  getAllEnvironmentsArgsMock,
  allEnvironmentsResponseMock,
  createEnvironmentArgsMock,
  createEnvironmentResponseMock,
} from "mocks/environments";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import {
  environmentsApi,
  useGetEnvironmentsQuery,
  useCreateEnvironmentMutation,
} from "../environments";

const updateTimeout = 5000;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const storeRef = setupApiStore(environmentsApi, {});
  return <Provider store={storeRef.store}>{children}</Provider>;
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

/**
 * ENDPOINTS
 */

describe("Environments Endpoint Tests", () => {
  const storeRef = setupApiStore(environmentsApi, {});

  test("Should getEnvironments successful", () => {
    fetchMock.mockResponse(JSON.stringify(allEnvironmentsResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          environmentsApi.endpoints.getEnvironments.initiate(
            getAllEnvironmentsArgsMock
          )
        )
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(allEnvironmentsResponseMock);
        })
    );
  });
  test("Should getEnvironments unsuccessful", () => {
    const storeRef = setupApiStore(environmentsApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          environmentsApi.endpoints.getEnvironments.initiate(
            getAllEnvironmentsArgsMock
          )
        )
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
  test("Should createEnvironment successful", () => {
    const storeRef = setupApiStore(environmentsApi, {});
    fetchMock.mockResponse(JSON.stringify(createEnvironmentResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          environmentsApi.endpoints.createEnvironment.initiate(
            createEnvironmentArgsMock
          )
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(createEnvironmentResponseMock);
        })
    );
  });
});

/**
 * HOOKS
 */

describe("Environments Endpoint Hooks Tests", () => {
  it("Should use useGetEnvironmentsQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(allEnvironmentsResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetEnvironmentsQuery(getAllEnvironmentsArgsMock),
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

  it("Should use useGetEnvironmentsQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetEnvironmentsQuery(getAllEnvironmentsArgsMock),
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

  it("Should use useCreateEnvironmentMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(createEnvironmentArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateEnvironmentMutation(undefined),
      {
        wrapper,
      }
    );
    const [createEnvironment, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createEnvironment(createEnvironmentArgsMock);
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

  it("Should use useCreateEnvironmentMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateEnvironmentMutation(undefined),
      {
        wrapper,
      }
    );
    const [createEnvironment, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createEnvironment(createEnvironmentArgsMock);
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
