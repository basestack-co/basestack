import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Navigation from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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
