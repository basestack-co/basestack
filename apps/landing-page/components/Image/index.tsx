import type { SpaceProps } from "styled-system";
// Components
import { Container, Image } from "./styles";

export interface ImageProps extends SpaceProps {
  src: string;
  alt: string;
}

const ImageComp = ({ src = "", alt = "", ...props }: ImageProps) => {
  return (
    <Container {...props}>
      <Image src={src} alt={alt} loading="lazy" />
    </Container>
  );
};

export default ImageComp;
