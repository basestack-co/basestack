import { forwardRef, memo } from "react";
import { useTheme } from "styled-components";
import { IconButtonProps } from "./types";
import Icon, { Size as IconSize } from "../Icon";
import { StyledButton } from "./styles";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "neutral", onClick, icon, size, ...props }, ref) => {
    const theme = useTheme();

    const handleIconColor = () => {
      switch (variant) {
        case "primary":
          return theme.colors.white;
        case "primaryNeutral":
          return theme.colors.blue400;
        case "secondary":
          return theme.colors.black;
        default:
        case "neutral":
          return theme.colors.black;
      }
    };

    const handleButtonSize = () => {
      switch (size) {
        case "xLarge":
          return {
            bg: "56px",
            icon: "xLarge", // icon 48
          };
        case "large":
          return {
            bg: "40px",
            icon: "large", // icon 32
          };
        default:
        case "medium":
          return {
            bg: "32px",
            icon: "medium", // icon 24
          };
        case "small":
          return {
            bg: "24px",
            icon: "small", // icon 18
          };
      }
    };

    const iconColor = handleIconColor();
    const buttonSize = handleButtonSize();

    return (
      <StyledButton
        ref={ref}
        onClick={onClick}
        variant={variant}
        iconSize={buttonSize.bg}
        {...props}
      >
        <Icon
          icon={icon}
          size={buttonSize.icon as IconSize}
          color={iconColor}
        />
      </StyledButton>
    );
  },
);

IconButton.displayName = "IconButton";

export default memo(IconButton);
