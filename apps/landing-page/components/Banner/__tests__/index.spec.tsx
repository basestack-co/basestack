import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Banner from "..";

describe("Banner tests", () => {
  afterEach(cleanup);

  test("should render Banner correctly", () => {
    const { asFragment } = renderWithTheme(<Banner />);

    expect(asFragment()).toMatchSnapshot();
  });
});
