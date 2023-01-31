import React from "react";
import HalfPlanet from "./HalfPlanet";
import Planet from "./Planet";

export enum IllustrationVariant {
  HalfPlanet = "halfPlanet",
  Planet = "planet",
}

interface IllustrationProps {
  variant: IllustrationVariant;
  color?: string;
  width?: number;
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
  };

  return illustration[variant];
};

export default Illustration;
