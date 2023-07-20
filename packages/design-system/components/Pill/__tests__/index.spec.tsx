import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Pill from "..";

describe("Pill tests", () => {
  afterEach(cleanup);

  test("render Pill correctly", () => {
    const { asFragment } = renderWithTheme(
      <Pill isSelected={false} onClick={jest.fn()} text="pill" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render selected Pill", () => {
    const { asFragment, getByTestId } = renderWithTheme(
      <Pill isSelected onClick={jest.fn()} text="pill" />,
    );
    const pill = getByTestId("pill-container");
    const pillText = getByTestId("pill-text");

    expect(pill).toHaveStyle(`background-color: #D4E2FC`);
    expect(pillText).toHaveStyle(`color: #276EF1`);
    expect(asFragment()).toMatchSnapshot();
  });
});
