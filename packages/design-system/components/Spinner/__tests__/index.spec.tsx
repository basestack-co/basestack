import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Spinner from "..";

describe("Spinner tests", () => {
  afterEach(cleanup);

  test("should render Spinner correctly", () => {
    const { asFragment } = renderWithTheme(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner size="small" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render medium Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner size="medium" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render large Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner size="large" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xLarge Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner size="xLarge" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xxLarge Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner size="xxLarge" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render custom styled Spinner", () => {
    const { asFragment } = renderWithTheme(<Spinner bg="red" color="blue" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
