import React from "react";
import HalfPlanet from "./HalfPlanet";
import Planet from "./Planet";
import Browser from "./Browser";
import WindowLoading from "./WindowLoading";
import Binoculars from "./Binoculars";
import Calendar from "./Calendar";
import ClickBrowser from "./ClickBrowser";
import ClickApp from "./ClickApp";
import { IllustrationProps } from "./types";

export enum IllustrationVariant {
  HalfPlanet = "halfPlanet",
  Planet = "planet",
  Browser = "browser",
  WindowLoading = "windowLoading",
  Binoculars = "binoculars",
  Calendar = "calendar",
  ClickBrowser = "clickBrowser",
  ClickApp = "clickApp",
}

export interface IllustrationCompProps extends IllustrationProps {
  variant: IllustrationVariant;
}

const illustrationComponents = {
  [IllustrationVariant.HalfPlanet]: HalfPlanet,
  [IllustrationVariant.Planet]: Planet,
  [IllustrationVariant.Browser]: Browser,
  [IllustrationVariant.WindowLoading]: WindowLoading,
  [IllustrationVariant.Binoculars]: Binoculars,
  [IllustrationVariant.Calendar]: Calendar,
  [IllustrationVariant.ClickBrowser]: ClickBrowser,
  [IllustrationVariant.ClickApp]: ClickApp,
};

const Illustration = ({
  variant,
  color = "black",
  width = "auto",
  height = "auto",
}: IllustrationCompProps) => {
  const Component = illustrationComponents[variant];

  if (!Component) {
    return null;
  }

  return <Component color={color} width={width} height={height} />;
};

export default Illustration;
