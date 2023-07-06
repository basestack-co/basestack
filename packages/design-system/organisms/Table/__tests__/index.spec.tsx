import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Table from "../index";
import { mockTableData } from "../__mocks__/mockData";
import { mockMembersTable } from "../__mocks__/mockMembersTable";

describe("Table Organism tests", () => {
  afterEach(cleanup);

  test("should render Table correctly", () => {
    const { asFragment } = renderWithTheme(<Table data={mockTableData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Table with space utils", () => {
    const { asFragment } = renderWithTheme(
      <Table data={mockTableData} mt={30} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Table with images", () => {
    const { asFragment, getAllByTestId } = renderWithTheme(
      <Table data={mockMembersTable} />,
    );

    const avatars = getAllByTestId("avatar");

    expect(avatars).toHaveLength(4);
    avatars.forEach((avatar) => expect(avatar).toBeVisible());
    expect(asFragment()).toMatchSnapshot();
  });
});
