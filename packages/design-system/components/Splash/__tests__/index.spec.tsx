import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Splash from "..";

describe("Splash tests", () => {
  afterEach(cleanup);

  test("render Splash correctly", () => {
    const { asFragment } = renderWithTheme(<Splash />);
    expect(asFragment()).toMatchSnapshot();
  });
});
