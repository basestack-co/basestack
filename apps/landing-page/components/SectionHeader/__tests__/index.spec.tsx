import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import SectionHeader from "..";

describe("SectionHeader tests", () => {
  afterEach(cleanup);

  test("should render default SectionHeader correctly", () => {
    const { asFragment } = renderWithTheme(
      <SectionHeader
        title="Section Title"
        text="Section Text"
        titleSize="normal"
        isDarkMode={false}
        hasMarginBottom={false}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render large SectionHeader in dark mode", () => {
    const { asFragment } = renderWithTheme(
      <SectionHeader
        title="Section Title"
        text="Section Text"
        titleSize="large"
        isDarkMode
        hasMarginBottom
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
