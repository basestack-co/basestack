import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Navigation from "..";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});

describe("Navigation tests", () => {
  afterEach(cleanup);

  test("should renders Navigation correctly", () => {
    const { asFragment } = renderWithTheme(<Navigation isDarkMode={false} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Navigation in dark mode", () => {
    const { asFragment } = renderWithTheme(<Navigation isDarkMode />);

    expect(asFragment()).toMatchSnapshot();
  });
});
