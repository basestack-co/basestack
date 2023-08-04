import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Modal from "../index";

describe("Modal tests", () => {
  afterEach(cleanup);

  const buttons = [
    { children: "Close", onClick: jest.fn },
    { children: "Create", onClick: jest.fn },
  ];

  test("should render Modal correctly", () => {
    const { asFragment } = renderWithTheme(
      <Modal
        title="Create Flag"
        isOpen={false}
        onClose={jest.fn()}
        buttons={buttons}
      >
        Body Content
      </Modal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Modal correctly open", () => {
    const { asFragment } = renderWithTheme(
      <Modal title="Create Flag" isOpen onClose={jest.fn()} buttons={buttons}>
        Body Content
      </Modal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Modal with custom props", () => {
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
      </Modal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
