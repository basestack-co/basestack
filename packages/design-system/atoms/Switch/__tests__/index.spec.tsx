import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Switch from "..";

describe("Switch Atom tests", () => {
  afterEach(cleanup);

  test("should render Switch with default props", () => {
    const { asFragment } = renderWithTheme(<Switch onChange={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Switch with text", () => {
    const { asFragment } = renderWithTheme(
      <Switch text="Lorem ipsum" onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Switch checked by default", () => {
    const { asFragment } = renderWithTheme(
      <Switch text="Lorem ipsum" onChange={jest.fn()} checked />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
