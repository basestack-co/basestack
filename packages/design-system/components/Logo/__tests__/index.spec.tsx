import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Logo from "..";

describe("Logo tests", () => {
  afterEach(cleanup);

  test("should render Flags Logo", () => {
    const { asFragment } = renderWithTheme(<Logo product="flags" />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Forms Logo", () => {
    const { asFragment } = renderWithTheme(<Logo product="forms" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
