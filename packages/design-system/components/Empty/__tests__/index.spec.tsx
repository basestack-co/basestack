import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Empty from "..";

describe("Empty tests", () => {
  afterEach(cleanup);

  test("should render Empty correctly", () => {
    const { asFragment } = renderWithTheme(
      <Empty
        title="title"
        button={{ text: "button", onClick: jest.fn() }}
        description="description"
        iconName="info"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
