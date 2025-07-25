import { memo } from "react";
import type { SpaceProps } from "styled-system";
import { Container, Image } from "./styles";

export type Size = "large" | "medium" | "small" | "xSmall";

export interface AvatarProps extends SpaceProps {
  /**
   * Change avatar size
   */
  size?: Size;
  /**
   * Image src
   */
  src?: string;
  /**
   * User name for initials
   */
  userName?: string;
  /**
   * Image Alt
   */
  alt: string;
  /**
   * Changes the shape from round to squared
   */
  round?: boolean;
}

const handleSize = (size: Size) => {
  switch (size) {
    case "large":
      return 56;
    case "small":
      return 36;
    case "xSmall":
      return 28;
    default:
      return 40;
  }
};

const Avatar = ({
  src,
  size = "medium",
  userName = "user name",
  round = true,
  alt,
  ...props
}: AvatarProps) => {
  const imageSize = handleSize(size);

  return (
    <Container round={round} data-testid="avatar" size={imageSize} {...props}>
      <Image
        alt={alt}
        src={
          src ||
          `https://api.dicebear.com/8.x/initials/svg?seed=${userName}&size=${imageSize}&fontSize=40`
        }
      />
    </Container>
  );
};

export default memo(Avatar);
