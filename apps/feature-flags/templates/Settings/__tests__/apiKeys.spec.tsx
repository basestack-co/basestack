import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import ApiKeys from "../ApiKeys";

describe("ApiKeys Template tests", () => {
  afterEach(cleanup);

  test("render ApiKeys correctly", () => {
    const { asFragment } = renderWithAllProviders(<ApiKeys />);

    expect(asFragment()).toMatchSnapshot();
  });
});
