import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import SettingCard from "../index";
import React from "react";

describe("SettingCard Molecule tests", () => {
  afterEach(cleanup);

  test("should render SettingCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <SettingCard
        title="title"
        description="description"
        button="button"
        onClick={jest.fn()}
        input={{
          onChange: jest.fn(),
          placeholder: "placeholder",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render SettingCard with text", () => {
    const { asFragment } = renderWithTheme(
      <SettingCard
        title="title"
        description="description"
        button="button"
        onClick={jest.fn()}
        text="text"
        input={{
          onChange: jest.fn(),
          placeholder: "placeholder",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
