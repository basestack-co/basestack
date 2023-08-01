import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import FlagRow from "../index";

describe("FlagRow Organism tests", () => {
  afterEach(cleanup);

  test("should render FlagRow correctly", () => {
    const { asFragment } = renderWithTheme(
      <FlagRow
        title="header_size"
        description="Display new header for only a number of users"
        // @ts-ignore
        environments={[
          { name: "Development", enabled: true, id: "1" },
          { name: "Staging", enabled: false, id: "2" },
          { name: "Production", enabled: false, id: "3" },
        ]}
        date="Created 11 jan 2022"
        popupItems={[]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render FlagRow with popup items", () => {
    const { asFragment } = renderWithTheme(
      <FlagRow
        title="header_size"
        description="Display new header for only a number of users"
        // @ts-ignore
        environments={[
          { name: "Development", enabled: true, id: "1" },
          { name: "Staging", enabled: false, id: "2" },
          { name: "Production", enabled: false, id: "3" },
        ]}
        date="Created 11 jan 2022"
        popupItems={[
          { text: "Edit", onClick: () => console.log("") },
          { text: "History", onClick: () => console.log("") },
          { text: "Delete", onClick: () => console.log("") },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
