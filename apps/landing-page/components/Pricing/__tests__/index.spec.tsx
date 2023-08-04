import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Pricing from "..";

describe("Pricing tests", () => {
  afterEach(cleanup);

  test("should render Pricing correctly", () => {
    const { asFragment } = renderWithTheme(<Pricing />);

    expect(asFragment()).toMatchSnapshot();
  });
});
