import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Popup from "..";

describe("Popup tests", () => {
  afterEach(cleanup);

  test("should render Popup correctly", () => {
    const { asFragment } = renderWithTheme(
      <Popup
        position="absolute"
        right={0}
        top={0}
        items={[
          { text: "Edit", onClick: jest.fn },
          { text: "History", onClick: () => jest.fn },
          { text: "Delete", onClick: () => jest.fn },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Popup with icons", () => {
    const { asFragment } = renderWithTheme(
      <Popup
        position="absolute"
        right={0}
        top={0}
        items={[
          { icon: "edit", text: "Edit", onClick: () => jest.fn },
          { icon: "edit", text: "History", onClick: () => jest.fn },
          { icon: "edit", text: "Delete", onClick: () => jest.fn },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
