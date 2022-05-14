import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  getAllUsersByProjectResponseMock,
  getUsersByProjectArgsMock,
  getUsersBySearchArgsMock,
  getAllUsersBySearchResponseMock,
} from "mocks/users";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import {
  usersApi,
  useGetUsersByProjectQuery,
  useGetUsersBySearchQuery,
} from "../users";

const updateTimeout = 5000;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const storeRef = setupApiStore(usersApi, {});
  return <Provider store={storeRef.store}>{children}</Provider>;
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

/**
 * ENDPOINTS
 */

describe("Users Endpoint Tests", () => {
  const storeRef = setupApiStore(usersApi, {});

  test("Should getUsersByProject successful", () => {
    fetchMock.mockResponse(JSON.stringify(getAllUsersByProjectResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          usersApi.endpoints.getUsersByProject.initiate(
            getUsersByProjectArgsMock
          )
        )
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(getAllUsersByProjectResponseMock);
        })
    );
  });

  test("Should getUsersByProject unsuccessful", () => {
    const storeRef = setupApiStore(usersApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          usersApi.endpoints.getUsersByProject.initiate(
            getUsersByProjectArgsMock
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

  test("Should getUsersBySearch successful", () => {
    fetchMock.mockResponse(JSON.stringify(getAllUsersBySearchResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          usersApi.endpoints.getUsersBySearch.initiate(getUsersBySearchArgsMock)
        )
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(getAllUsersBySearchResponseMock);
        })
    );
  });

  test("Should getUsersBySearch unsuccessful", () => {
    const storeRef = setupApiStore(usersApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          usersApi.endpoints.getUsersBySearch.initiate(getUsersBySearchArgsMock)
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
});

/**
 * HOOKS
 */

describe("Users Endpoint Hooks Tests", () => {
  it("Should use useGetUsersByProjectQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(getAllUsersByProjectResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetUsersByProjectQuery(getUsersByProjectArgsMock),
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

  it("Should use useGetUsersByProjectQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetUsersByProjectQuery(getUsersByProjectArgsMock),
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

  it("Should use useGetUsersBySearchQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(getAllUsersBySearchResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetUsersBySearchQuery(getUsersBySearchArgsMock),
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

  it("Should use useGetUsersBySearchQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetUsersBySearchQuery(getUsersBySearchArgsMock),
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
