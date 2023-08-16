import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Cards, { CardsProps } from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Cards tests", () => {
  afterEach(cleanup);

  const cardsProps: CardsProps = {
    title: "Test Title",
    text: "Test text",
    cards: [
      {
        title: "Test Card Title 1",
        text: "Test Card Text 1",
        icon: "help",
      },
      {
        title: "Test Card Title 2",
        text: "Test Card Text 2",
        icon: "help",
      },
    ],
    isDarkMode: false,
  };

  test("should render the component correctly with provided props", () => {
    const { getByText } = renderWithTheme(<Cards {...cardsProps} />);

    expect(getByText(cardsProps.title)).toBeInTheDocument();
    expect(getByText(cardsProps.text)).toBeInTheDocument();
    expect(getByText(cardsProps.cards[0].title)).toBeInTheDocument();
    expect(getByText(cardsProps.cards[0].text)).toBeInTheDocument();
    expect(getByText(cardsProps.cards[1].title)).toBeInTheDocument();
    expect(getByText(cardsProps.cards[1].text)).toBeInTheDocument();
  });
});
