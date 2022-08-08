import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/testUtils";
import Navigation from "..";

describe.skip("Navigation Organism tests", () => {
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

  test("should render Navigation correctly", () => {
    const { asFragment } = renderWithTheme(<Navigation isDesktop />);
    expect(asFragment()).toMatchSnapshot();
  });
});
