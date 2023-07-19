import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Card from "..";

describe("Card tests", () => {
  afterEach(cleanup);

  test("render Card correctly", () => {
    const { asFragment, getByTestId } = renderWithTheme(<Card>Content</Card>);
    const card = getByTestId("card");

    expect(card).toHaveStyle(`border-radius: ${rem("6px")}`);
    expect(card).toHaveStyle(`background-color: #FFFFFF`);
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Card with style system utils", () => {
    const { getByTestId } = renderWithTheme(<Card mb={20}>Content</Card>);
    const card = getByTestId("card");
    expect(card).toHaveStyle(`margin-bottom: 20px`);
  });

  test("render Card with hover animation", () => {
    const { getByTestId } = renderWithTheme(
      <Card hasHoverAnimation>Content</Card>,
    );
    const card = getByTestId("card");
  });
});
