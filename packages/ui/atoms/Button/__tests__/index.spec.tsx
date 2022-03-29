import { cleanup } from "@testing-library/react";
import "jest-styled-components";
import { renderWithTheme } from "../../../utils/testUtils";
import Button from "..";

describe("Button Atom tests", () => {
  afterEach(cleanup);

  test("render Button with default props", () => {
    const { asFragment } = renderWithTheme(
      <Button onClick={jest.fn}>Filled normal button</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Button with custom props", () => {
    const { asFragment } = renderWithTheme(
      <Button onClick={jest.fn} fullWidth>
        Outlined fullWidth small disabled button
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Button as link", () => {
    const { asFragment } = renderWithTheme(
      <Button onClick={jest.fn} as="a" href="/" variant="outline" size="small">
        Outlined button link
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Button with icon styles", () => {
    const { asFragment } = renderWithTheme(
      <Button onClick={jest.fn} as="a" href="/" hasLeftIcon hasRightIcon>
        Outlined button link
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
