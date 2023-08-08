import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Footer from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Footer tests", () => {
  afterEach(cleanup);

  test("should render Footer correctly", () => {
    const { asFragment } = renderWithTheme(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
