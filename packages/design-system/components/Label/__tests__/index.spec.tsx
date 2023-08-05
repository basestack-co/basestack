import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Label from "..";

describe("Label tests", () => {
  afterEach(cleanup);

  test("should render Label correctly", () => {
    const { asFragment } = renderWithTheme(
      <Label text="label" variant="default" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render isTranslucent Label", () => {
    const { asFragment } = renderWithTheme(
      <Label text="label" variant="info" isTranslucent />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small Label", () => {
    const { asFragment } = renderWithTheme(
      <Label text="label" variant="info" size="small" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render medium Label", () => {
    const { asFragment } = renderWithTheme(
      <Label text="label" variant="info" size="medium" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
