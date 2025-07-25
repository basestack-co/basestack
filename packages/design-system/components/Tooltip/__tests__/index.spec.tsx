import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Icon from "../../Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "..";

describe("Tooltip tests", () => {
  afterEach(cleanup);

  test("should render Tooltip correctly", () => {
    const { asFragment } = renderWithTheme(
      <Tooltip placement="top">
        <TooltipTrigger>
          <Icon icon="info" color="black" size="small" />
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
