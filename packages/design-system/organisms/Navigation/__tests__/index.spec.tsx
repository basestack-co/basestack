import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Navigation from "..";

describe("Navigation Organism tests", () => {
  afterEach(cleanup);

  test("should render Navigation correctly", () => {
    const { asFragment } = renderWithTheme(
      <Navigation onCreateFlag={jest.fn} pathname="/flags" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
