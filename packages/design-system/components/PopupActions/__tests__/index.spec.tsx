import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import PopupActions from "..";

describe("PopupActions tests", () => {
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
            id: "1",
            text: "Moon flags",
            slug: "moon-lags",
            onClick: jest.fn(),
          },
          {
            id: "2",
            text: "Teams kids",
            slug: "teams-kids",
            onClick: jest.fn(),
          },
        ]}
        button={{
          text: "Create Project",
          onClick: jest.fn(),
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
