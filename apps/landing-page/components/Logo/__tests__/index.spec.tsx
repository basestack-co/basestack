import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Logo from "..";

describe("Logo tests", () => {
  afterEach(cleanup);

  test("should render Logo correctly", () => {
    const { asFragment } = renderWithTheme(<Logo />);

    expect(asFragment()).toMatchSnapshot();
  });
});
