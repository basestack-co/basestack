import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import WaitingList from "..";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});

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
