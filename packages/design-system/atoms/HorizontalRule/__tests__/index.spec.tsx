import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Hr from "..";

describe("Hr Atom tests", () => {
  afterEach(cleanup);

  test("render Hr correctly", () => {
    const { asFragment, getByTestId } = renderWithTheme(<Hr />);
    const hr = getByTestId("horizontal-rule");

    expect(hr).toHaveStyle(`height: 1px`);
    expect(hr).toHaveStyle(`border: none`);
    expect(hr).toHaveStyle(`background-color: #EEEEEE`);
    expect(hr).toHaveStyle(`width: 100%`);
    expect(asFragment()).toMatchSnapshot();
  });
});
