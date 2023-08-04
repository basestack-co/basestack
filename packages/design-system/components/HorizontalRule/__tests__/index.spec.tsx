import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Hr from "..";

describe("Hr tests", () => {
  afterEach(cleanup);

  test("render Hr correctly", () => {
    const { asFragment } = renderWithTheme(<Hr />);
    expect(asFragment()).toMatchSnapshot();
  });
});
