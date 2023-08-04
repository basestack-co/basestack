import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import { ButtonSize, ButtonVariant } from "../types";
import { Button } from "..";

describe("Button tests", () => {
  afterEach(cleanup);

  test("should render Button correctly", () => {
    const { asFragment } = renderWithTheme(
      <Button size={ButtonSize.Normal}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button with onClick", () => {
    const onClick = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Button onClick={onClick}>button link</Button>,
    );

    const button = getByTestId("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  test("should render Button with icon", () => {
    const { asFragment, getByTestId } = renderWithTheme(
      <Button
        icon="help"
        onClick={jest.fn()}
        iconSize="medium"
        iconPlacement="left"
      >
        button icon
      </Button>,
    );

    const icon = getByTestId("icon");

    expect(icon).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button with styled system utilities", () => {
    const { asFragment } = renderWithTheme(
      <Button flexDirection="column" mb={100}>
        button link
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button link", () => {
    const { asFragment } = renderWithTheme(<Button as="a">button link</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Neutral Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.Neutral}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Secondary Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.Secondary}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Tertiary Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.Tertiary}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render PrimaryNeutral Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.PrimaryNeutral}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render DangerFilled Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.DangerFilled}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Outlined Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.Outlined}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Danger Button", () => {
    const { asFragment } = renderWithTheme(
      <Button variant={ButtonVariant.Danger}>button</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
