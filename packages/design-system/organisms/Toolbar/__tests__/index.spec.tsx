import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Toolbar from "..";

describe("Toolbar Organism tests", () => {
  afterEach(cleanup);

  test("should render Toolbar correctly", () => {
    const { asFragment } = renderWithTheme(
      <Toolbar
        onSelect={jest.fn()}
        environments={["development", "staging", "production"]}
        onSearch={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Toolbar with core elements", () => {
    const { getByTestId } = renderWithTheme(
      <Toolbar
        onSelect={jest.fn()}
        environments={["development", "staging", "production"]}
        onSearch={jest.fn()}
      />
    );

    const search = getByTestId("search-input");
    const pills = getByTestId("pills");

    expect(search).toBeVisible();
    expect(pills).toBeVisible();
  });
});
