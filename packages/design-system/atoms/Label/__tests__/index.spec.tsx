import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Label from "..";

describe("Label Atom tests", () => {
  afterEach(cleanup);

  test("render Label correctly", () => {
    const { asFragment } = renderWithTheme(
      <Label text="label" variant="default" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render success Label", () => {
    const { asFragment, getByTestId } = renderWithTheme(
      <Label text="Green label" variant="success" />
    );
    const label = getByTestId("label-container");

    expect(label).toHaveStyle(`background-color: #05944F`);
    expect(label).toHaveStyle(`color: #FFFFFF`);
    expect(asFragment()).toMatchSnapshot();
  });
});
