import { memo } from "react";
import CustomIcon, { iconNamesArray } from "./CustomIcon";
import { Container, Icon } from "./styles";
import { CustomIconNames, IconProps, Size } from "./types";

const handleSize = (size: Size) => {
  switch (size) {
    case "xxLarge":
      return 60;
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
  const isCustomIcon = iconNamesArray.includes(icon);

  return (
    <Container data-testid="icon-container" size={iconSize} {...props}>
      {isCustomIcon ? (
        <CustomIcon
          icon={icon as CustomIconNames}
          color={color}
          size={iconSize}
        />
      ) : (
        <Icon
          data-testid="icon"
          color={color}
          muted={muted}
          size={iconSize}
          className="material-symbols-rounded"
        >
          {icon}
        </Icon>
      )}
    </Container>
  );
};

export type { IconProps, Size, CustomIconNames };

export default memo(IconComp);
