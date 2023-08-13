import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Illustration, { IllustrationVariant } from "..";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useMedia: jest.fn(() => false),
}));

describe("Illustration tests", () => {
  afterEach(cleanup);

  test("should render Browser Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Browser} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Illustration with color and width", () => {
    const { asFragment } = renderWithTheme(
      <Illustration
        color="red"
        width={400}
        variant={IllustrationVariant.Browser}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Planet Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Planet} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Binoculars Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Binoculars} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render WindowLoading Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.WindowLoading} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render HalfPlanet Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.HalfPlanet} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Calendar Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Calendar} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render ClickApp Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.ClickApp} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render ClickBrowser Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.ClickBrowser} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
