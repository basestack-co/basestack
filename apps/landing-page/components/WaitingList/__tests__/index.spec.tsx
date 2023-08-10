import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import WaitingList from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
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
