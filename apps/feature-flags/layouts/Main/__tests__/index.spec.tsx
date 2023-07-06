import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup, fireEvent } from "@testing-library/react";
import "libs/trpc";
import MainLayout from "..";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

jest.mock("libs/trpc", () => ({
  project: {
    all: {
      useQuery: jest
        .fn()
        .mockReturnValue({ data: { projects: [] }, isLoading: false }),
    },
  },
}));

describe.skip("MainLayout", () => {
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

  it("renders the children", () => {
    const { getByText } = renderWithAllProviders(
      <MainLayout>
        <div>Hello World</div>
      </MainLayout>,
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders a loading spinner when status is loading", () => {
    const { getByText } = renderWithAllProviders(
      <MainLayout>
        <div>Hello World</div>
      </MainLayout>,
    );
    expect(getByText("...isLoading")).toBeInTheDocument();
  });

  it("renders the Navigation component when status is authenticated", () => {
    const { getByTestId } = renderWithAllProviders(
      <MainLayout>
        <div>Hello World</div>
      </MainLayout>,
    );
    expect(getByTestId("navigation")).toBeInTheDocument();
  });

  it("renders the TabBar component when status is authenticated and isMobile is true", () => {
    const { getByTestId } = renderWithAllProviders(
      <MainLayout>
        <div>Hello World</div>
      </MainLayout>,
    );
    expect(getByTestId("tab-bar")).toBeInTheDocument();
  });

  it("opens the create flag modal when the create flag button is clicked", () => {
    const { getByTestId } = renderWithAllProviders(
      <MainLayout>
        <div>Hello World</div>
      </MainLayout>,
    );
    fireEvent.click(getByTestId("create-flag-button"));
    expect(getByTestId("create-flag-modal")).toBeInTheDocument();
  });
});

/* describe.skip("Main Layout tests", () => {
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
}); */
