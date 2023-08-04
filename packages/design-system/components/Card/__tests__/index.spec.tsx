import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Card from "..";

describe("Card tests", () => {
  afterEach(cleanup);

  test("should render Card correctly", () => {
    const { asFragment } = renderWithTheme(<Card>Content</Card>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Card with style system utils", () => {
    const { asFragment } = renderWithTheme(<Card mb={20}>Content</Card>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Card with hover animation", () => {
    const { asFragment } = renderWithTheme(
      <Card hasHoverAnimation>Content</Card>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
