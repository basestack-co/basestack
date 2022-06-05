import React from "react";
import { renderWithAllProviders } from "../../../utils/testUtils";
import { cleanup } from "@testing-library/react";
import SettingsLayout from "..";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

describe("Settings Layout tests", () => {
  afterEach(cleanup);

  test("render SettingsLayout correctly", () => {
    const { asFragment } = renderWithAllProviders(
      <SettingsLayout>
        <div>Page content</div>
      </SettingsLayout>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
