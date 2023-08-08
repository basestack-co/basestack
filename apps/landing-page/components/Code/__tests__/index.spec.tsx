import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Code from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("Code tests", () => {
  afterEach(cleanup);

  test("should render Code correctly", () => {
    const { asFragment } = renderWithTheme(<Code />);

    expect(asFragment()).toMatchSnapshot();
  });
});
