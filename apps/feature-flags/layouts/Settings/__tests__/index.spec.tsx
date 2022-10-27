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

describe.skip("Settings Layout tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

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
