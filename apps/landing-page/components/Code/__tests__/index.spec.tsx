import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Code from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Code tests", () => {
  afterEach(cleanup);

  test("should render Code correctly", () => {
    const { asFragment } = renderWithTheme(<Code />);

    expect(asFragment()).toMatchSnapshot();
  });
});
