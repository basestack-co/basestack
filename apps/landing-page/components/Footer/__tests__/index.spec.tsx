import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Footer from "..";

describe("Footer tests", () => {
  afterEach(cleanup);

  test("render Footer correctly", () => {
    const { asFragment } = renderWithTheme(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
