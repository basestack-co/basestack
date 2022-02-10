import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Badge from "./index";

describe("Badge Component", () => {
  test("renders", () => {
    const { asFragment } = renderWithTheme(<Badge>2</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });
  test("renders with props", () => {
    const { asFragment } = renderWithTheme(<Badge className="badge">2</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });
});
