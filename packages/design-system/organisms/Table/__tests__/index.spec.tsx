import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Table from "../index";
import { mockTableData } from "../__mocks__/mockData";

describe("Table Organism tests", () => {
  afterEach(cleanup);

  test("should render Table correctly", () => {
    const { asFragment } = renderWithTheme(<Table data={mockTableData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Table with space utils", () => {
    const { asFragment } = renderWithTheme(
      <Table data={mockTableData} mt={30} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
