import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import { IllustrationVariant } from "../../Illustration";
import Card from "..";

describe.skip("Card tests", () => {
  afterEach(cleanup);

  test("should display the illustration, title, and text", () => {
    const title = "My Card";
    const text = "This is the content of the card.";
    const illustration = {
      variant: IllustrationVariant.Binoculars,
    };

    const { getByText } = renderWithTheme(
      <Card text={text} title={title} illustration={illustration} />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });

  test("should display the text and title in white when isDarkMode is true", () => {
    const title = "My Card";
    const text = "This is the content of the card.";
    const illustration = {
      variant: IllustrationVariant.Binoculars,
    };

    const { getByText } = renderWithTheme(
      <Card text={text} title={title} illustration={illustration} isDarkMode />,
    );

    expect(getByText(title)).toHaveStyle("color: #F6F6F6");
    expect(getByText(text)).toHaveStyle("color: #CBCBCB");
  });
});
