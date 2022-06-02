import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Textarea from "..";

describe("Textarea Atom tests", () => {
  afterEach(cleanup);

  test("should render Textarea correctly", () => {
    const { asFragment } = renderWithTheme(
      <Textarea placeholder="Search here..." onChange={jest.fn} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render textarea dark", () => {
    const { getByTestId } = renderWithTheme(
      <Textarea placeholder="Search here..." onChange={jest.fn} isDarker />
    );
    const textarea = getByTestId("textarea");

    expect(textarea).toHaveStyle(`background-color: #EEEEEE`);
    expect(textarea).toHaveStyle(`min-height: ${rem("150px")}`);
    expect(textarea).toHaveStyle(`font-size: ${rem("14px")}`);
  });
});
