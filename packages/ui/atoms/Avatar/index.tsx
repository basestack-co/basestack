import React from "react";
import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";

export type Size =
  | "xxLarge"
  | "xLarge"
  | "large"
  | "medium"
  | "small"
  | "xSmall";

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

const handleTextVariants = (size?: Size) => {
  switch (size) {
    case "xxLarge":
      return css`
        height: 80px;
        width: 80px;
      `;
    case "xLarge":
      return css`
        height: 62px;
        width: 62px;
      `;
    case "large":
      return css`
        height: 56px;
        width: 56px;
      `;
    default:
    case "medium":
      return css`
        height: 40px;
        width: 40px;
      `;
    case "small":
      return css`
        height: 30px;
        width: 30px;
      `;
    case "xSmall":
      return css`
        height: 24px;
        width: 24px;
      `;
  }
};

const handleInitialsSize = (size?: Size) => {
  switch (size) {
    case "xxLarge":
      return 80;
    case "xLarge":
      return 62;
    case "large":
      return 56;
    default:
    case "medium":
      return 40;
    case "small":
      return 30;
    case "xSmall":
      return 24;
  }
};

const Container = styled.div<{ size?: Size }>`
  ${({ size }) => handleTextVariants(size)};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  ${space};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Avatar = ({
  src,
  size,
  userName = "user name",
  alt,
  ...props
}: AvatarProps) => {
  const initialsSize = handleInitialsSize(size);

  return (
    <Container size={size} {...props}>
      <Image
        alt={alt}
        src={
          src ||
          `https://avatars.dicebear.com/api/initials/${userName}.svg?size=${initialsSize}&fontSize=40`
        }
      />
    </Container>
  );
};

export default Avatar;
