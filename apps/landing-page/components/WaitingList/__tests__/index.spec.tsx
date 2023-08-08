import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import WaitingList from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("WaitingList tests", () => {
  afterEach(cleanup);

  test("should render WaitingList correctly", () => {
    const { asFragment } = renderWithTheme(
      <WaitingList
        data={[
          {
            icon: "help",
            title: "title",
            text: "text",
            image: { src: "", alt: "" },
          },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
