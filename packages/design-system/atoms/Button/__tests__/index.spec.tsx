import { cleanup } from "@testing-library/react";
import { rem } from "polished";
import { renderWithTheme } from "../../../utils/testUtils";
import { ButtonVariant } from "../types";
import Button from "..";

describe("Button Atom tests", () => {
  afterEach(cleanup);

  test("should render Button correctly", () => {
    const { asFragment, getByText } = renderWithTheme(<Button>button</Button>);
    const button = getByText(/button/);

    expect(button).toHaveStyle(`height: ${rem("36px")}`);
    expect(button).toHaveStyle(`display: flex`);
    expect(button).toHaveStyle(`align-items: center`);
    expect(button).toHaveStyle(`font-size: ${rem("14px")}`);
    expect(button).toHaveStyle(`font-weight: 500`);
    expect(button).toHaveStyle(`cursor: pointer`);
    expect(button).toHaveStyle(`border-radius: 4px`);
    expect(button).toHaveStyle(`padding: 0 ${rem("12px")}`);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button with onClick", () => {
    const { asFragment } = renderWithTheme(
      <Button onClick={jest.fn()}>button link</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button with icon", () => {
    const { asFragment } = renderWithTheme(
      <Button
        icon="help"
        onClick={jest.fn()}
        iconSize="medium"
        iconPlacement="left"
      >
        button icon
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button with styled system utilities", () => {
    const { asFragment } = renderWithTheme(
      <Button flexDirection="column" mb={100}>
        button link
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button link", () => {
    const { asFragment } = renderWithTheme(<Button as="a">button link</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render primary Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Primary}>primary</Button>
    );
    const button = getByText(/primary/);
    expect(button).toHaveStyle(`color: #FFFFFF`);
    expect(button).toHaveStyle(`background-color: #276EF1`);
  });

  test("should render primaryNeutral Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.PrimaryNeutral}>primaryNeutral</Button>
    );
    const button = getByText(/primaryNeutral/);
    expect(button).toHaveStyle(`color: #000000`);
    expect(button).toHaveStyle(`background-color: transparent`);
  });

  test("should render secondary Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Secondary}>secondary</Button>
    );
    const button = getByText(/secondary/);
    expect(button).toHaveStyle(`color: #FFFFFF`);
    expect(button).toHaveStyle(`background-color: #000000`);
  });

  test("should render tertiary Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Tertiary}>tertiary</Button>
    );
    const button = getByText(/tertiary/);
    expect(button).toHaveStyle(`color: #000000`);
    expect(button).toHaveStyle(`background-color: #EEEEEE`);
  });

  test("should render tertiary Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Outlined}>outlined</Button>
    );
    const button = getByText(/outlined/);
    expect(button).toHaveStyle(`color: #000000`);
    expect(button).toHaveStyle(`background-color: transparent`);
    expect(button).toHaveStyle(`border: 2px solid #000000`);
  });

  test("should render neutral Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Neutral}>neutral</Button>
    );
    const button = getByText(/neutral/);
    expect(button).toHaveStyle(`color: #000000`);
    expect(button).toHaveStyle(`background-color: transparent`);
  });

  test("should render danger Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Danger}>danger</Button>
    );
    const button = getByText(/danger/);
    expect(button).toHaveStyle(`color: #E11900`);
    expect(button).toHaveStyle(`background-color: transparent`);
  });

  test("should render fullWidth Button", () => {
    const { getByText } = renderWithTheme(
      <Button variant={ButtonVariant.Secondary} fullWidth>
        fullWidth
      </Button>
    );
    const button = getByText(/fullWidth/);
    expect(button).toHaveStyle(`width: 100%`);
  });

  test("should render Button with spinner", () => {
    const { asFragment } = renderWithTheme(
      <Button isLoading>fullWidth</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Button disabled", () => {
    const { asFragment } = renderWithTheme(
      <Button isDisabled>fullWidth</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
