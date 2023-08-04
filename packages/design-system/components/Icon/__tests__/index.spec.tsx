import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Icon from "..";

describe("Icon tests", () => {
  afterEach(cleanup);

  test("should render Icon correctly", () => {
    const { asFragment } = renderWithTheme(<Icon icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render muted Icon", () => {
    const { asFragment } = renderWithTheme(<Icon muted icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render red Icon", () => {
    const { asFragment } = renderWithTheme(<Icon color="red" icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small Icon", () => {
    const { asFragment } = renderWithTheme(<Icon size="small" icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render medium Icon", () => {
    const { asFragment } = renderWithTheme(<Icon size="medium" icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render large Icon", () => {
    const { asFragment } = renderWithTheme(<Icon size="large" icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xLarge Icon", () => {
    const { asFragment } = renderWithTheme(<Icon size="xLarge" icon="help" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
