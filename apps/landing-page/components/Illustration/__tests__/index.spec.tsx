import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Illustration, { IllustrationVariant } from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("Illustration tests", () => {
  afterEach(cleanup);

  test("should render Browser Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Browser} />,
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
});
