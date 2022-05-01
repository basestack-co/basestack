import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  historyByProjectIdResponseMock,
  historyByProjectIdArgsMock,
} from "mocks/history";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import { historyApi, useGetHistoryQuery } from "../history";

const updateTimeout = 5000;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const storeRef = setupApiStore(historyApi, {});
  return <Provider store={storeRef.store}>{children}</Provider>;
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

/**
 * ENDPOINTS
 */

describe("History Endpoint Tests", () => {
  const storeRef = setupApiStore(historyApi, {});

  test("Should getHistory successful", () => {
    fetchMock.mockResponse(JSON.stringify(historyByProjectIdResponseMock));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          historyApi.endpoints.getHistory.initiate(historyByProjectIdArgsMock)
        )
        .then((action: any) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe("fulfilled");
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(historyByProjectIdResponseMock);
        })
    );
  });
  test("Should getHistory unsuccessful", () => {
    const storeRef = setupApiStore(historyApi, {});
    fetchMock.mockReject(new Error("Internal Server Error"));

    return (
      storeRef.store
        // @ts-ignore
        .dispatch<any>(
          historyApi.endpoints.getHistory.initiate(historyByProjectIdArgsMock)
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

describe("History Endpoint Hooks Tests", () => {
  it("Should use useGetHistoryQuery with Success", async () => {
    fetchMock.mockResponse(JSON.stringify(historyByProjectIdResponseMock));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetHistoryQuery(historyByProjectIdArgsMock),
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

  it("Should use useGetHistoryQuery with Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetHistoryQuery(historyByProjectIdArgsMock),
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
