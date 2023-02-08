import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Code from "..";

describe("Code tests", () => {
  afterEach(cleanup);

  test("render Code correctly", () => {
    const { asFragment } = renderWithTheme(<Code />);

    expect(asFragment()).toMatchSnapshot();
  });
});
