import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Pricing from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("Pricing tests", () => {
  afterEach(cleanup);

  test("should render Pricing correctly", () => {
    const { asFragment } = renderWithTheme(<Pricing />);

    expect(asFragment()).toMatchSnapshot();
  });
});
