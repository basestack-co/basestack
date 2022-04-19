import React from "react";
import fetchMock from "jest-fetch-mock";
// Mocks
import {
  getAllEnvironmentsArgsMock,
  allEnvironmentsResponseMock,
} from "mocks/environments";
// Utils
import { setupApiStore } from "utils/setupApiStore";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
// Queries
import { environmentsApi, useGetEnvironmentsQuery } from "../environments";

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
});
