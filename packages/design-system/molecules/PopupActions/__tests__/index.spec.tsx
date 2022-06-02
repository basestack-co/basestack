import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import PopupActions from "..";

describe("PopupActions Molecule tests", () => {
  afterEach(cleanup);

  test("should render PopupActions correctly", () => {
    const { asFragment } = renderWithTheme(
      <PopupActions
        position="absolute"
        top={0}
        left={0}
        title="Projects"
        items={[
          {
            text: "Moon flags",
            onClick: jest.fn(),
            logo: "",
          },
          {
            text: "Teams kids",
            onClick: jest.fn(),
            logo: "",
          },
        ]}
        button={{
          text: "Create Project",
          onClick: jest.fn(),
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
