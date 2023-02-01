import React from "react";
import HalfPlanet from "./HalfPlanet";
import Planet from "./Planet";
import Browser from "./Browser";
import WindowLoading from "./WindowLoading";
import Binoculars from "./Binoculars";

export enum IllustrationVariant {
  HalfPlanet = "halfPlanet",
  Planet = "planet",
  Browser = "browser",
  WindowLoading = "windowLoading",
  Binoculars = "binoculars",
}

export interface IllustrationProps {
  variant: IllustrationVariant;
  color?: string;
  width?: number | string;
}

const Illustration = ({
  variant,
  color = "black",
  width = 200,
}: IllustrationProps) => {
  const illustration = {
    [IllustrationVariant.HalfPlanet]: (
      <HalfPlanet color={color} width={width} />
    ),
    [IllustrationVariant.Planet]: <Planet color={color} width={width} />,
    [IllustrationVariant.Browser]: <Browser color={color} width={width} />,
    [IllustrationVariant.WindowLoading]: (
      <WindowLoading color={color} width={width} />
    ),
    [IllustrationVariant.Binoculars]: (
      <Binoculars color={color} width={width} />
    ),
  };

  return illustration[variant];
};

export default Illustration;
