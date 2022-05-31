import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Pagination from "..";

describe("Pagination Molecule tests", () => {
  afterEach(cleanup);

  test("should render Pagination correctly", () => {
    const { asFragment } = renderWithTheme(
      <Pagination
        currentPage={10}
        totalPages={11}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Pagination correctly", () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Pagination
        currentPage={10}
        totalPages={11}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );
    const prevButton = getByText(/Prev/);
    const nextButton = getByText(/Next/);
    const currentPage = getByTestId("pagination-current-page");
    const totalPages = getByTestId("pagination-total-pages");

    expect(prevButton).toBeVisible();
    expect(nextButton).toBeVisible();
    expect(currentPage).toHaveTextContent("10");
    expect(totalPages).toHaveTextContent("of 11");
  });
});
