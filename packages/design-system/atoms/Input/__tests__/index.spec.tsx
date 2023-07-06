import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Input from "..";

describe("Input Atom tests", () => {
  afterEach(cleanup);

  test("should render Input correctly", () => {
    const { asFragment } = renderWithTheme(
      <Input
        placeholder="Search here..."
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render input container", () => {
    const { getByTestId } = renderWithTheme(
      <Input
        placeholder="Search here..."
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    const container = getByTestId("input-container");

    expect(container).toHaveStyle(`position: relative`);
    expect(container).toHaveStyle(`display: flex`);
    expect(container).toHaveStyle(`align-items: center`);
  });

  test("should render normal input", () => {
    const { getByTestId } = renderWithTheme(
      <Input
        placeholder="Search here..."
        onChange={jest.fn()}
        format="normal"
        name="feature"
        value=""
      />,
    );
    const input = getByTestId("input");

    expect(input).toHaveStyle(`background-color: #F6F6F6`);
    expect(input).toHaveStyle(`height: ${rem("44px")}`);
    expect(input).toHaveStyle(`font-size: ${rem("14px")}`);
    expect(input).toHaveStyle(`width: 100%`);
    expect(input).toHaveStyle(`padding: 0 ${rem("16px")}`);
  });

  test("should render small input", () => {
    const { getByTestId } = renderWithTheme(
      <Input
        format="small"
        placeholder="Search here..."
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    const input = getByTestId("input");

    expect(input).toHaveStyle(`height: ${rem("36px")}`);
  });

  test("should render input with left icon", () => {
    const { getByTestId } = renderWithTheme(
      <Input
        placeholder="Search here..."
        icon="search"
        iconPlacement="left"
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    const input = getByTestId("input");
    const iconContainer = getByTestId("icon-container");
    const icon = getByTestId("icon");

    expect(input).toHaveStyle(`padding-left: ${rem("44px")}`);
    expect(iconContainer).toHaveStyle(`position: absolute`);
    expect(iconContainer).toHaveStyle(`left:  ${rem("12px")}`);
    expect(icon).toBeVisible();
  });

  test("should render input with right icon", () => {
    const { getByTestId } = renderWithTheme(
      <Input
        placeholder="Search here..."
        icon="search"
        iconPlacement="right"
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    const input = getByTestId("input");
    const iconContainer = getByTestId("icon-container");
    const icon = getByTestId("icon");

    expect(input).toHaveStyle(`padding-right: ${rem("44px")}`);
    expect(iconContainer).toHaveStyle(`position: absolute`);
    expect(iconContainer).toHaveStyle(`right:  ${rem("12px")}`);
    expect(icon).toBeVisible();
  });
});
