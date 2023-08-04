import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Skeleton from "..";

describe("Skeleton tests", () => {
  afterEach(cleanup);

  test("should render Skeleton correctly", () => {
    const { asFragment } = renderWithTheme(
      <Skeleton
        items={[
          { h: 25, w: "15%", mb: 10 },
          { h: 1, w: "100%", mb: 10 },
          { h: 50, w: "100%" },
        ]}
        padding={20}
        hasShadow
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
