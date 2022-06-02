import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Tabs from "..";

describe("Tabs Molecule tests", () => {
  afterEach(cleanup);

  test("should render Tabs correctly", () => {
    const { asFragment } = renderWithTheme(
      <Tabs
        items={[{ text: "Core" }, { text: "Advanced" }]}
        onSelect={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Tabs with space utils", () => {
    const { asFragment } = renderWithTheme(
      <Tabs
        items={[{ text: "Core" }, { text: "Advanced" }]}
        onSelect={jest.fn()}
        mb={20}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
