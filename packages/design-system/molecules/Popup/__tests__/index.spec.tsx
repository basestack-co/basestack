import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Popup from "..";

describe("Popup Molecule tests", () => {
  afterEach(cleanup);

  test("should render Popup correctly", () => {
    const { asFragment } = renderWithTheme(
      <Popup
        position="absolute"
        right={0}
        top={0}
        items={[
          { text: "Edit", onClick: () => console.log("") },
          { text: "History", onClick: () => console.log("") },
          { text: "Delete", onClick: () => console.log("") },
        ]}
      />
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
          { icon: "edit", text: "Edit", onClick: () => console.log("") },
          { icon: "edit", text: "History", onClick: () => console.log("") },
          { icon: "edit", text: "Delete", onClick: () => console.log("") },
        ]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
