import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Select from "..";

describe("Select tests", () => {
  afterEach(cleanup);

  test("should render Select correctly", () => {
    const { asFragment } = renderWithTheme(<Select />);
    expect(asFragment()).toMatchSnapshot();
  });
});
