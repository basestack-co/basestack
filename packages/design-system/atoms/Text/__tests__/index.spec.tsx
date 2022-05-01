import React from "react";
import { cleanup } from "@testing-library/react";
import { rem } from "polished";
import { renderWithTheme } from "../../../utils/testUtils";
import Text from "..";

describe("Text Atom tests", () => {
  afterEach(cleanup);

  test("should render text correctly", () => {
    const { asFragment } = renderWithTheme(<Text>Text</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render red text", () => {
    const { getByText } = renderWithTheme(<Text color="red">red</Text>);
    expect(getByText(/red/)).toHaveStyle(`color: red`);
  });

  test("should render muted text", () => {
    const { getByText } = renderWithTheme(<Text muted>muted</Text>);
    expect(getByText(/muted/)).toHaveStyle(`color: #545454`);
  });

  test("should render xSmall text", () => {
    const { getByText } = renderWithTheme(<Text size="xSmall">xSmall</Text>);
    const text = getByText(/xSmall/);
    expect(text).toHaveStyle(`font-size: ${rem("12px")}`);
    expect(text).toHaveStyle(`font-weight: 400`);
    expect(text).toHaveStyle(`color: #000000`);
  });

  test("should render small text", () => {
    const { getByText } = renderWithTheme(<Text size="small">small</Text>);
    const text = getByText(/small/);
    expect(text).toHaveStyle(`font-size: ${rem("14px")}`);
    expect(text).toHaveStyle(`font-weight: 400`);
    expect(text).toHaveStyle(`color: #000000`);
  });

  test("should render medium text", () => {
    const { getByText } = renderWithTheme(<Text size="medium">medium</Text>);
    const text = getByText(/medium/);
    expect(text).toHaveStyle(`font-size: ${rem("16px")}`);
    expect(text).toHaveStyle(`font-weight: 500`);
    expect(text).toHaveStyle(`color: #000000`);
  });

  test("should render large text", () => {
    const { getByText } = renderWithTheme(<Text size="large">large</Text>);
    const text = getByText(/large/);
    expect(text).toHaveStyle(`font-size: ${rem("18px")}`);
    expect(text).toHaveStyle(`font-weight: 500`);
    expect(text).toHaveStyle(`color: #000000`);
  });

  test("should render xLarge text", () => {
    const { getByText } = renderWithTheme(<Text size="xLarge">xLarge</Text>);
    const text = getByText(/xLarge/);
    expect(text).toHaveStyle(`font-size: ${rem("20px")}`);
    expect(text).toHaveStyle(`font-weight: 500`);
    expect(text).toHaveStyle(`color: #000000`);
  });

  test("should render xxLarge text", () => {
    const { getByText } = renderWithTheme(<Text size="xxLarge">xxLarge</Text>);
    const text = getByText(/xxLarge/);
    expect(text).toHaveStyle(`font-size: ${rem("24px")}`);
    expect(text).toHaveStyle(`font-weight: 700`);
    expect(text).toHaveStyle(`color: #000000`);
  });
});
