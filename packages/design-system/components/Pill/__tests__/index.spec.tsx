import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Pill from "..";

describe("Pill tests", () => {
  afterEach(cleanup);

  test("should render Pill correctly", () => {
    const { asFragment } = renderWithTheme(
      <Pill isSelected={false} onClick={jest.fn()} text="pill" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
