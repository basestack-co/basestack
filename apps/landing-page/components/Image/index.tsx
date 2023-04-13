import React from "react";
// Components
import { Container, Image } from "./styles";
import { SpaceProps } from "styled-system";

export interface ImageProps extends SpaceProps {
  src: string;
  alt: string;
}

const ImageComp = ({ src = "", alt = "", ...props }: ImageProps) => {
  return (
    <Container {...props}>
      <Image src={src} alt={alt} />
    </Container>
  );
};

export default ImageComp;
