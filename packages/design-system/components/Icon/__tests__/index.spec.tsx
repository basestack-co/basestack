import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Icon from "..";

describe("Icon tests", () => {
  afterEach(cleanup);

  test("render Icon correctly", () => {
    const { asFragment } = renderWithTheme(<Icon icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render muted Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon muted icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`color: #545454`);
  });

  test("should render red Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon color="red" icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`color: red`);
  });

  test("should render small Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon size="small" icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`font-size: ${rem("18px")}`);
  });

  test("should render medium Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon size="medium" icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`font-size: ${rem("24px")}`);
  });

  test("should render large Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon size="large" icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`font-size: ${rem("32px")}`);
  });

  test("should render xLarge Icon", () => {
    const { getByTestId } = renderWithTheme(<Icon size="xLarge" icon="help" />);
    const icon = getByTestId("icon");

    expect(icon).toHaveStyle(`font-size: ${rem("48px")}`);
  });
});
