import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import IconBox from "..";

describe("IconBox tests", () => {
  afterEach(cleanup);

  test("should render IconBox blue", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="blue" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox purple", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="purple" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox gray", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="gray" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox green", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="green" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
