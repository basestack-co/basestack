import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Banner from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Banner tests", () => {
  afterEach(cleanup);

  test("should render Banner correctly", () => {
    const { asFragment } = renderWithTheme(<Banner />);

    expect(asFragment()).toMatchSnapshot();
  });
});
