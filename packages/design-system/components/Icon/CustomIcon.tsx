import React from "react";
import { useTheme } from "styled-components";
import { CustomIconCompProps, CustomIconProps, CustomIconNames } from "./types";
import { GoogleIcon, GoogleColorsIcon, GithubIcon } from "./icons";

const iconMap: Record<CustomIconNames, React.ComponentType<CustomIconProps>> = {
  github: GithubIcon,
  google: GoogleIcon,
  google_colors: GoogleColorsIcon,
};

// Convert the keys of the iconMap into an array
export const iconNamesArray = Object.keys(iconMap) as Array<string>;

const CustomIcon = ({ icon, size, color }: CustomIconCompProps) => {
  const theme = useTheme();
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} color={color || theme.icon.color} />;
};

export default CustomIcon;
