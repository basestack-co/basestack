import React from "react";
import { renderWithAllProviders } from "utils/testUtils";
import DemoModal from "..";

describe("DemoModal tests", () => {
  test("render DemoModal correctly", () => {
    const { asFragment } = renderWithAllProviders(<DemoModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
