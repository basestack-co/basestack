import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Text from "..";

describe("Text tests", () => {
  afterEach(cleanup);

  test("should render text correctly", () => {
    const { asFragment } = renderWithTheme(<Text>Text</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render red text", () => {
    const { asFragment } = renderWithTheme(<Text color="red">red</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render muted text", () => {
    const { asFragment } = renderWithTheme(<Text muted>muted</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xSmall text", () => {
    const { asFragment } = renderWithTheme(<Text size="xSmall">xSmall</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small text", () => {
    const { asFragment } = renderWithTheme(<Text size="small">small</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render medium text", () => {
    const { asFragment } = renderWithTheme(<Text size="medium">medium</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render large text", () => {
    const { asFragment } = renderWithTheme(<Text size="large">large</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xLarge text", () => {
    const { asFragment } = renderWithTheme(<Text size="xLarge">xLarge</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render xxLarge text", () => {
    const { asFragment } = renderWithTheme(<Text size="xxLarge">xxLarge</Text>);
    expect(asFragment()).toMatchSnapshot();
  });
});
