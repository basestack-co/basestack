import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Toolbar from "..";

describe("Toolbar Organism tests", () => {
  afterEach(cleanup);

  test("should render Toolbar correctly", () => {
    const { asFragment } = renderWithTheme(
      <Toolbar
        onChangeView={jest.fn()}
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
        onChangeView={jest.fn()}
        onSelect={jest.fn()}
        environments={["development", "staging", "production"]}
        onSearch={jest.fn()}
      />
    );

    const search = getByTestId("search-input");
    const pills = getByTestId("pills");
    const segment = getByTestId("segment-component");

    expect(search).toBeVisible();
    expect(pills).toBeVisible();
    expect(segment).toBeVisible();
  });
});
