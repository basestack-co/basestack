import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import SlideCard from "..";

describe("SlideCard tests", () => {
  afterEach(cleanup);

  test("should render SlideCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <SlideCard
        title="title"
        text="text"
        icon="help"
        isActive={false}
        onClick={jest.fn()}
        animationTime={10}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render SlideCard active", () => {
    const { asFragment } = renderWithTheme(
      <SlideCard
        title="title"
        text="text"
        icon="help"
        isActive
        onClick={jest.fn()}
        animationTime={10}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
