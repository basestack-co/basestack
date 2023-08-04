import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Footer from "..";

describe("Footer tests", () => {
  afterEach(cleanup);

  test("should render Footer correctly", () => {
    const { asFragment } = renderWithTheme(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
