import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import FlagCard from "..";

describe("FlagCard Molecule tests", () => {
  afterEach(cleanup);

  test("should render FlagCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <FlagCard
        onClickMore={jest.fn()}
        title="header_size"
        description="Display new header for only a number of users"
        environments={[
          { text: "Development", isFlagOn: true },
          { text: "Staging", isFlagOn: false },
          { text: "Production", isFlagOn: false },
        ]}
        date="Created 11 jan 2022"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render FlagCard with core elements", () => {
    const { getByTestId, getByText } = renderWithTheme(
      <FlagCard
        onClickMore={jest.fn()}
        title="header_size"
        description="Display new header for only a number of users"
        environments={[
          { text: "Development", isFlagOn: true },
          { text: "Staging", isFlagOn: false },
          { text: "Production", isFlagOn: false },
        ]}
        date="Created 11 jan 2022"
      />
    );
    const title = getByTestId("flag-title");
    const description = getByTestId("flag-description");
    const labels = getByTestId("flag-labels");
    const devLabel = getByTestId("Development-flag-label");
    const stagLabel = getByTestId("Staging-flag-label");
    const prodLabel = getByTestId("Production-flag-label");
    const date = getByTestId("flag-date");

    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(labels).toBeVisible();
    expect(devLabel).toBeVisible();
    expect(stagLabel).toBeVisible();
    expect(prodLabel).toBeVisible();
    expect(date).toBeVisible();
  });
});
