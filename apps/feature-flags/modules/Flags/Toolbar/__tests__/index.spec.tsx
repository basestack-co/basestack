import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/testUtils";
import Toolbar from "..";

describe.skip("Toolbar Organism tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  afterEach(cleanup);

  test("should render Toolbar correctly", () => {
    const { asFragment } = renderWithTheme(
      <Toolbar
        isDesktop
        onChangeView={jest.fn()}
        onSearchCallback={jest.fn()}
        selectedView="cards"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Toolbar with core elements", () => {
    const { getByTestId } = renderWithTheme(
      <Toolbar
        isDesktop
        onChangeView={jest.fn()}
        onSearchCallback={jest.fn()}
        selectedView="cards"
      />,
    );

    const search = getByTestId("search-input");
    const pills = getByTestId("pills");
    const segment = getByTestId("segment-component");

    expect(search).toBeVisible();
    expect(pills).toBeVisible();
    expect(segment).toBeVisible();
  });
});
