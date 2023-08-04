import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Input from "..";

describe("Input tests", () => {
  afterEach(cleanup);

  test("should render Input correctly", () => {
    const { asFragment } = renderWithTheme(
      <Input
        placeholder="Search here..."
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small input", () => {
    const { asFragment } = renderWithTheme(
      <Input
        format="small"
        placeholder="Search here..."
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render input with left icon", () => {
    const { asFragment } = renderWithTheme(
      <Input
        placeholder="Search here..."
        icon="search"
        iconPlacement="left"
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render input with right icon", () => {
    const { asFragment } = renderWithTheme(
      <Input
        placeholder="Search here..."
        icon="search"
        iconPlacement="right"
        onChange={jest.fn()}
        name="feature"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
