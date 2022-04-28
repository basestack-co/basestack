import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  allFlagsResponseMock,
  getFlagsArgsMock,
  createFlagsResponseMock,
  createFlagArgsMock,
  getFlagByIdResponseMock,
  getFlagByIdArgsMock,
  updateFlagByIdArgsMock,
  updateFlagByIdResponseMock,
  deleteFlagByIdResponseMock,
  deleteFlagByIdArgsMock,
} from "mocks/flags";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import {
  flagsApi,
  useGetFlagsQuery,
  useCreateFlagMutation,
  useGetFlagByIdQuery,
  useUpdateFlagByIdMutation,
  useDeleteFlagByIdMutation,
} from "../flags";

const updateTimeout = 5000;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const storeRef = setupApiStore(flagsApi, {});
  return <Provider store={storeRef.store}>{children}</Provider>;
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

/**
 * ENDPOINTS
 */

describe("Flags Endpoint Tests", () => {
  const storeRef = setupApiStore(flagsApi, {});

  test("Should getFlags successful", () => {
    fetchMock.mockResponse(JSON.stringify(allFlagsResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(flagsApi.endpoints.getFlags.initiate(getFlagsArgsMock))
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(allFlagsResponseMock);
        })
    );
  });
  test("Should getFlags unsuccessful", () => {
    const storeRef = setupApiStore(flagsApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(flagsApi.endpoints.getFlags.initiate(getFlagsArgsMock))
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

  test("Should getFlagsById successful", () => {
    fetchMock.mockResponse(JSON.stringify(getFlagByIdResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          flagsApi.endpoints.getFlagById.initiate(getFlagByIdArgsMock)
        )
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(getFlagByIdResponseMock);
        })
    );
  });

  test("Should getFlagsById unsuccessful", () => {
    const storeRef = setupApiStore(flagsApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          flagsApi.endpoints.getFlagById.initiate(getFlagByIdArgsMock)
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

  test("Should createFlag successful", () => {
    const storeRef = setupApiStore(flagsApi, {});
    fetchMock.mockResponse(JSON.stringify(createFlagsResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          flagsApi.endpoints.createFlag.initiate(createFlagArgsMock)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(createFlagsResponseMock);
        })
    );
  });

  test("Should updateFlagById successful", () => {
    const storeRef = setupApiStore(flagsApi, {});
    fetchMock.mockResponse(JSON.stringify(updateFlagByIdResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          flagsApi.endpoints.updateFlagById.initiate(updateFlagByIdArgsMock)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(updateFlagByIdResponseMock);
        })
    );
  });

  test("Should deleteFlagById successful", () => {
    const storeRef = setupApiStore(flagsApi, {});
    fetchMock.mockResponse(JSON.stringify(deleteFlagByIdResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          flagsApi.endpoints.deleteFlagById.initiate(deleteFlagByIdArgsMock)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(deleteFlagByIdResponseMock);
        })
    );
  });
});

/**
 * HOOKS
 */

describe("Flags Endpoint Hooks Tests", () => {
  it("Should use useGetFlagsQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(allFlagsResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetFlagsQuery(getFlagsArgsMock),
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

  it("Should use useGetFlagsQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetFlagsQuery(getFlagsArgsMock),
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

  it("Should use useGetFlagByIdQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(getFlagByIdResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetFlagByIdQuery(getFlagByIdArgsMock),
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

  it("Should use useGetFlagByIdQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetFlagByIdQuery(getFlagByIdArgsMock),
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

  it("Should use useCreateFlagMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(createFlagArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateFlagMutation(undefined),
      {
        wrapper,
      }
    );
    const [createFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createFlag(createFlagArgsMock);
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

  it("Should use useCreateFlagMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateFlagMutation(undefined),
      {
        wrapper,
      }
    );
    const [createFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createFlag(createFlagArgsMock);
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

  it("Should use useUpdateFlagByIdMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(updateFlagByIdArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateFlagByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [updateFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateFlag(updateFlagByIdArgsMock);
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

  it("Should use useUpdateFlagByIdMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateFlagByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [updateFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateFlag(updateFlagByIdArgsMock);
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

  it("Should use useDeleteFlagByIdMutation with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(deleteFlagByIdArgsMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useDeleteFlagByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [deleteFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void deleteFlag(deleteFlagByIdArgsMock);
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

  it("Should use useDeleteFlagByIdMutation with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useDeleteFlagByIdMutation(undefined),
      {
        wrapper,
      }
    );
    const [deleteFlag, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void deleteFlag(deleteFlagByIdArgsMock);
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
