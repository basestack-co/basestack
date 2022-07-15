import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import Environments from "../Environments";

describe("Environments Template tests", () => {
  afterEach(cleanup);

  test("render Environments correctly", () => {
    const { asFragment } = renderWithAllProviders(<Environments />);

    expect(asFragment()).toMatchSnapshot();
  });
});
