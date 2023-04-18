import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import HistoryCard from "../index";

describe("HistoryCard Molecule tests", () => {
  afterEach(cleanup);

  test("should render HistoryCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <HistoryCard
        avatar=""
        userName="Joana Lopes"
        description="toggled off"
        flagName="user_image"
        date="1 hour ago"
        environment="Development"
        type="toggledOff"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
