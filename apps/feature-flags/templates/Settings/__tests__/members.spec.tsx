import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import Members from "../Members";

describe("Members General tests", () => {
  afterEach(cleanup);

  test("render General correctly", () => {
    const { asFragment } = renderWithAllProviders(<Members />);

    expect(asFragment()).toMatchSnapshot();
  });
});
