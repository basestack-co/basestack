import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import TabBar from "..";

describe("TabBar Organism tests", () => {
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

  test("should render TabBar correctly", () => {
    const { asFragment } = renderWithTheme(
      <TabBar onCreateFlag={jest.fn} pathname="/settings" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
