import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Loader from "..";

describe("Loader tests", () => {
  afterEach(cleanup);

  test("should render Loader correctly", () => {
    const { asFragment } = renderWithTheme(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
