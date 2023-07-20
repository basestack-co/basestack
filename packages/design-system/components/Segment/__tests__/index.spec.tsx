import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Segment from "..";

describe("Segment tests", () => {
  afterEach(cleanup);

  test("should render Segment correctly", () => {
    const { asFragment } = renderWithTheme(
      <Segment
        onSelect={jest.fn()}
        items={[
          { icon: "view_module", id: "cards" },
          { icon: "view_stream", id: "table" },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Segment with icons and test", () => {
    const { asFragment } = renderWithTheme(
      <Segment
        onSelect={jest.fn()}
        items={[
          { text: "Item 1", icon: "view_module", id: "cards" },
          { text: "Item 2", icon: "view_stream", id: "table" },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render active Segment", () => {
    const { container, getAllByTestId } = renderWithTheme(
      <Segment
        onSelect={jest.fn()}
        items={[
          { text: "Item 1", id: "cards" },
          { text: "Item 2", id: "table" },
        ]}
      />,
    );
    const item1 = getAllByTestId("segment-button")[0];

    expect(item1).toHaveClass("active");
  });
});
