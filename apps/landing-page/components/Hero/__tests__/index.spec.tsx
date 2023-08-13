import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Hero from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Hero tests", () => {
  afterEach(cleanup);

  test("should renders Hero correctly", () => {
    const title = "Welcome to my app";
    const text = "Discover the power of my app";

    const { asFragment } = renderWithTheme(<Hero title={title} text={text} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
