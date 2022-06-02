import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import FlagCard from "../index";

describe("FlagCard Molecule tests", () => {
  afterEach(cleanup);

  test("should render FlagCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <FlagCard
        title="header_size"
        description="Display new header for only a number of users"
        environments={[
          { text: "Development", isFlagOn: true },
          { text: "Staging", isFlagOn: false },
          { text: "Production", isFlagOn: false },
        ]}
        date="Created 11 jan 2022"
        popupItems={[]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render FlagCard with popup items", () => {
    const { asFragment } = renderWithTheme(
      <FlagCard
        title="header_size"
        description="Display new header for only a number of users"
        environments={[
          { text: "Development", isFlagOn: true },
          { text: "Staging", isFlagOn: false },
          { text: "Production", isFlagOn: false },
        ]}
        date="Created 11 jan 2022"
        popupItems={[
          { text: "Edit", onClick: () => console.log("") },
          { text: "History", onClick: () => console.log("") },
          { text: "Delete", onClick: () => console.log("") },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
