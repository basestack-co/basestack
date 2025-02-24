import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Pagination from "..";

describe("Pagination tests", () => {
  afterEach(cleanup);

  test("should render Pagination correctly", () => {
    const { asFragment } = renderWithTheme(
      <Pagination
        currentPage={10}
        totalPages={11}
        isLoading={false}
        onClick={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Pagination with core elements", () => {
    const { getByTestId } = renderWithTheme(
      <Pagination
        currentPage={10}
        totalPages={11}
        isLoading={false}
        onClick={jest.fn()}
      />,
    );
    const leftText = getByTestId("pagination-left-text");
    const currentPage = getByTestId("pagination-current-page");
    const totalPages = getByTestId("pagination-total-pages");

    expect(leftText).toHaveTextContent("Showing");
    expect(currentPage).toHaveTextContent("10");
    expect(totalPages).toHaveTextContent("of 11");
  });
});
