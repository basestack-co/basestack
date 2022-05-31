import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import InputGroup from "..";

describe("InputGroup Molecule tests", () => {
  afterEach(cleanup);

  test("should render InputGroup correctly", () => {
    const { asFragment } = renderWithTheme(
      <InputGroup
        title="Feature Key"
        inputProps={{
          onChange: jest.fn(),
          placeholder: "E.g. header_size",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render InputGroup with hint", () => {
    const { asFragment } = renderWithTheme(
      <InputGroup
        title="Feature Key"
        inputProps={{
          onChange: jest.fn(),
          placeholder: "E.g. header_size",
        }}
        hint="no special characters"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render InputGroup with label", () => {
    const { asFragment } = renderWithTheme(
      <InputGroup
        title="Feature Key"
        inputProps={{
          onChange: jest.fn(),
          placeholder: "E.g. header_size",
        }}
        label="0 / 120"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render InputGroup as textarea", () => {
    const { asFragment } = renderWithTheme(
      <InputGroup
        title="Feature Key"
        textarea
        textareaProps={{
          onChange: jest.fn(),
          placeholder: "Description",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
