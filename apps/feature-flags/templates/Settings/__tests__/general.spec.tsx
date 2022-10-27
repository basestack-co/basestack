import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import General from "../General";

describe("Environments General tests", () => {
  afterEach(cleanup);

  test("render General correctly", () => {
    const { asFragment } = renderWithAllProviders(<General />);

    expect(asFragment()).toMatchSnapshot();
  });
});
