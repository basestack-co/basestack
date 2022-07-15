import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import IconButton from "..";

describe("IconButton Atom tests", () => {
  afterEach(cleanup);

  test("should render IconButton correctly", () => {
    const { asFragment } = renderWithTheme(
      <IconButton onClick={jest.fn()} icon="help" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render primary IconButton", () => {
    const { asFragment } = renderWithTheme(
      <IconButton onClick={jest.fn()} icon="help" variant="primary" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render primaryNeutral IconButton", () => {
    const { asFragment } = renderWithTheme(
      <IconButton onClick={jest.fn()} icon="help" variant="primaryNeutral" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render secondary IconButton", () => {
    const { asFragment } = renderWithTheme(
      <IconButton onClick={jest.fn()} icon="help" variant="secondary" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconButton with different size", () => {
    const { asFragment } = renderWithTheme(
      <IconButton
        onClick={jest.fn()}
        icon="help"
        variant="secondary"
        size="large"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
