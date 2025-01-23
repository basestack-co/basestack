import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import IconBox from "..";

describe("IconBox tests", () => {
  afterEach(cleanup);

  test("should render IconBox blue", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="blue" size="large" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox purple", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="purple" size="large" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox gray", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="gray" size="large" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox green", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" color="green" size="large" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render IconBox outlined", () => {
    const { asFragment } = renderWithTheme(
      <IconBox icon="help" variant="outlined" size="large" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
