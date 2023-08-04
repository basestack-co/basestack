import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Textarea from "..";

describe("Textarea tests", () => {
  afterEach(cleanup);

  test("should render Textarea correctly", () => {
    const { asFragment } = renderWithTheme(
      <Textarea
        placeholder="Search here..."
        onChange={jest.fn}
        name="test1"
        value=""
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render textarea dark", () => {
    const { asFragment } = renderWithTheme(
      <Textarea
        placeholder="Search here..."
        onChange={jest.fn}
        name="test1"
        value=""
        isDarker
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
