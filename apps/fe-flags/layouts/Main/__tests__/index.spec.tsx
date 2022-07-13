import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import MainLayout from "..";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

describe("Main Layout tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  afterEach(cleanup);

  test("render MainLayout correctly", () => {
    const { asFragment } = renderWithAllProviders(
      <MainLayout>
        <div>Page content</div>
      </MainLayout>,
      { app: { isNavCollapsed: false } }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
