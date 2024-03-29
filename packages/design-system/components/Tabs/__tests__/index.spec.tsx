import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Tabs from "..";

describe("Tabs tests", () => {
  afterEach(cleanup);

  test("should render Tabs correctly", () => {
    const { asFragment } = renderWithTheme(
      <Tabs
        items={[
          { text: "Core", id: "core" },
          { text: "Advanced", id: "advanced" },
        ]}
        onSelect={jest.fn()}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Tabs with space utils", () => {
    const { asFragment } = renderWithTheme(
      <Tabs
        items={[
          { text: "Core", id: "core" },
          { text: "Advanced", id: "advanced" },
        ]}
        onSelect={jest.fn()}
        mb={20}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
