import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import { allFlagsResponseMock, getFlagsArgsMock } from "mocks/flags";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import { flagsApi, useGetFlagsQuery } from "../flags";

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
});
