import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Questions from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Questions tests", () => {
  afterEach(cleanup);

  test("should render the title and text passed as props", () => {
    const title = "FAQ";
    const text = "Find answers to your questions";
    const data = [
      {
        title: "What is your return policy?",
        text: "Our return policy is...",
      },
      {
        title: "Do you offer international shipping?",
        text: "Yes, we offer international shipping.",
      },
    ];

    const { getByText } = renderWithTheme(
      <Questions title={title} text={text} data={data} />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });
});
