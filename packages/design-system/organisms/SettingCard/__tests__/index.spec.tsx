import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import SettingCard from "../index";
import Input from "../../../atoms/Input";
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
      >
        <div>renders correctly</div>
      </SettingCard>
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
      >
        <div>renders with text</div>
      </SettingCard>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render SettingCard with Input as children", () => {
    const { asFragment } = renderWithTheme(
      <SettingCard
        title="title"
        description="description"
        button="button"
        onClick={jest.fn()}
        text="text"
      >
        <Input
          maxWidth={400}
          onChange={jest.fn()}
          placeholder="placeholder"
          name="feature"
          value=""
        />
      </SettingCard>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
