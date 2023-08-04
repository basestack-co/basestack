import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Accordion from "..";

describe("Accordion tests", () => {
  afterEach(cleanup);

  test("should render Accordion correctly", () => {
    const title = "My Accordion";
    const text = "This is the content of the accordion.";

    const { asFragment } = renderWithTheme(
      <Accordion text={text} title={title} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should should toggle the content visibility when the header is clicked", () => {
    const title = "My Accordion";
    const text = "This is the content of the accordion.";

    const { getByText } = renderWithTheme(
      <Accordion title={title} text={text} />,
    );

    const header = getByText(title);
    fireEvent.click(header);
    expect(getByText(text)).toBeInTheDocument();
  });
});
