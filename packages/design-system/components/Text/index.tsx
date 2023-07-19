import { memo } from "react";
import { TextProps } from "./types";
import {
  XSmallText,
  SmallText,
  MediumText,
  LargeText,
  XLargeText,
  XXLargeText,
} from "./styles";

const Text = ({
  size = "small",
  muted = false,
  color,
  children,
  fontFamily = "roboto",
  lineTruncate = false,
  ...props
}: TextProps) => {
  const sharedProps = {
    muted,
    color,
    fontFamily,
    lineTruncate,
  };

  switch (size) {
    case "xxLarge":
      return (
        <XXLargeText {...sharedProps} {...props}>
          {children}
        </XXLargeText>
      );
    case "xLarge":
      return (
        <XLargeText {...sharedProps} {...props}>
          {children}
        </XLargeText>
      );
    case "large":
      return (
        <LargeText {...sharedProps} {...props}>
          {children}
        </LargeText>
      );
    case "medium":
      return (
        <MediumText {...sharedProps} {...props}>
          {children}
        </MediumText>
      );
    default:
    case "small":
      return (
        <SmallText {...sharedProps} {...props}>
          {children}
        </SmallText>
      );
    case "xSmall":
      return (
        <XSmallText {...sharedProps} {...props}>
          {children}
        </XSmallText>
      );
  }
};

export { type TextProps };

export default memo(Text);
