import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Footer from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Footer tests", () => {
  afterEach(cleanup);

  test("should render Footer correctly", () => {
    const { asFragment } = renderWithTheme(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
