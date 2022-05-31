import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { Container, Icon } from "./styles";

export type Size = "xLarge" | "large" | "medium" | "small";

interface IconProps extends SpaceProps {
  /**
   * Icon name
   */
  icon: string;
  /**
   * Icon size
   */
  size?: Size;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Icon muted color
   */
  muted?: boolean;
}

const handleSize = (size: Size) => {
  switch (size) {
    case "xLarge":
      return 48;
    case "large":
      return 32;
    default:
    case "medium":
      return 24;
    case "small":
      return 18;
  }
};

const IconComp = ({
  icon,
  size = "medium",
  color,
  muted,
  ...props
}: IconProps) => {
  const iconSize = handleSize(size);

  return (
    <Container data-testid="icon-container" size={iconSize} {...props}>
      <Icon
        data-testid="icon"
        color={color}
        muted={muted}
        size={iconSize}
        className="material-symbols-sharp"
      >
        {icon}
      </Icon>
    </Container>
  );
};

export default memo(IconComp);
