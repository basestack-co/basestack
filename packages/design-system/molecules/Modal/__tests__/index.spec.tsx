import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Modal from "../index";

describe("Modal Molecule tests", () => {
  afterEach(cleanup);

  const buttons = [
    { text: "Close", onClick: () => console.log("yo") },
    { text: "Create", onClick: () => console.log("yo") },
  ];

  test("render Modal correctly", () => {
    const { asFragment } = renderWithTheme(
      <Modal
        title="Create Flag"
        isOpen={false}
        onClose={jest.fn()}
        buttons={buttons}
      >
        Body Content
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render Modal correctly open", () => {
    const { asFragment } = renderWithTheme(
      <Modal title="Create Flag" isOpen onClose={jest.fn()} buttons={buttons}>
        Body Content
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render Modal with custom props", () => {
    const { asFragment } = renderWithTheme(
      <Modal
        title="Create Flag Large"
        isOpen
        onClose={jest.fn()}
        buttons={buttons}
        size="large"
        minHeight={300}
      >
        Body Content
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
