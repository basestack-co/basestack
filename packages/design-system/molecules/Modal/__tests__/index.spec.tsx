import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Modal from "../index";

describe("Modal Molecule tests", () => {
  afterEach(cleanup);

  test("render Modal correctly", () => {
    const { asFragment } = renderWithTheme(
      <Modal
        title="Create Flag"
        isOpen={false}
        onClose={jest.fn()}
        buttons={[
          { text: "Close", onClick: () => console.log("yo") },
          { text: "Create", onClick: () => console.log("yo") },
        ]}
      >
        Body Content
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Modal correctly open", () => {
    const { asFragment } = renderWithTheme(
      <Modal
        title="Create Flag"
        isOpen
        onClose={jest.fn()}
        buttons={[
          { text: "Close", onClick: () => console.log("yo") },
          { text: "Create", onClick: () => console.log("yo") },
        ]}
      >
        Body Content
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
