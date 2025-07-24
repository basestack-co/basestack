import { memo } from "react";
import type { SpaceProps } from "styled-system";
import { StyledSpinner } from "./styles";

export interface SpinnerProps extends SpaceProps {
  /**
   * change the size
   */
  size?: "small" | "medium" | "large" | "xLarge" | "xxLarge";
  /**
   * change color
   */
  color?: string;
  /**
   * change background color
   */
  bg?: string;
}

const Spinner = ({ size = "medium", color, bg, ...props }: SpinnerProps) => {
  const getSize = {
    small: "24px",
    medium: "32px",
    large: "40px",
    xLarge: "48px",
    xxLarge: "56px",
  };

  const getStrokeSize = {
    small: "3px",
    medium: "3px",
    large: "4px",
    xLarge: "5px",
    xxLarge: "5px",
  };

  return (
    <StyledSpinner
      {...props}
      size={getSize[size]}
      strokeSize={getStrokeSize[size]}
      color={color}
      bg={bg}
    />
  );
};

export default memo(Spinner);
