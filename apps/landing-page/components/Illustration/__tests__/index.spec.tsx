import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Illustration, { IllustrationVariant } from "..";

describe("Illustration tests", () => {
  afterEach(cleanup);

  test("render Browser Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Browser} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render Planet Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Planet} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render Binoculars Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.Binoculars} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render WindowLoading Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.WindowLoading} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("render HalfPlanet Illustration correctly", () => {
    const { asFragment } = renderWithTheme(
      <Illustration variant={IllustrationVariant.HalfPlanet} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
