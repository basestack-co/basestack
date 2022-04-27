import React from "react";
import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Textarea from "..";

describe("Textarea Atom tests", () => {
  afterEach(cleanup);

  test("should render Textarea correctly", () => {
    const { asFragment } = renderWithTheme(
      <Textarea placeholder="Search here..." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render textarea dark", () => {
    const { getByTestId } = renderWithTheme(
      <Textarea placeholder="Search here..." isDarker />
    );
    const textarea = getByTestId("textarea");

    expect(textarea).toHaveStyle(`background-color: #EEEEEE`);
    expect(textarea).toHaveStyle(`min-height: ${rem("100px")}`);
    expect(textarea).toHaveStyle(`font-size: ${rem("14px")}`);
  });
});
