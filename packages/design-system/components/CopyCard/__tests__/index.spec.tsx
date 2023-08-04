import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import CopyCard from "..";

describe("CopyCard tests", () => {
  afterEach(cleanup);

  test("should render CopyCard correctly", () => {
    const { asFragment } = renderWithTheme(
      <CopyCard
        title="title"
        description="description"
        tooltip={{
          defaultText: "defaultText",
          successText: "successText",
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
