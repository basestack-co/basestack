import React from "react";
import HalfPlanet from "./HalfPlanet";
import Planet from "./Planet";
import Browser from "./Browser";
import WindowLoading from "./WindowLoading";
import Binoculars from "./Binoculars";
import Calendar from "./Calendar";
import ClickBrowser from "./ClickBrowser";
import ClickApp from "./ClickApp";

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

export interface IllustrationProps {
  variant: IllustrationVariant;
  color?: string;
  width?: number | string;
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
  width = 200,
}: IllustrationProps) => {
  const Component = illustrationComponents[variant];

  if (!Component) {
    return null;
  }

  return <Component color={color} width={width} />;
};

export default Illustration;
