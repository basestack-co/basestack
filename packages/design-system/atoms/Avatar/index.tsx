import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { Container, Image } from "./styles";

export type Size = "large" | "medium" | "small";

interface AvatarProps extends SpaceProps {
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
}

const handleSize = (size: Size) => {
  switch (size) {
    case "large":
      return 56;
    default:
    case "medium":
      return 40;
    case "small":
      return 24;
  }
};

const Avatar = ({
  src,
  size = "medium",
  userName = "user name",
  alt,
  ...props
}: AvatarProps) => {
  const imageSize = handleSize(size);

  return (
    <Container data-testid="avatar" size={imageSize} {...props}>
      <Image
        alt={alt}
        src={
          src ||
          `https://avatars.dicebear.com/api/initials/${userName}.svg?size=${imageSize}&fontSize=40`
        }
      />
    </Container>
  );
};

export default memo(Avatar);
