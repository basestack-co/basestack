import React, { memo } from "react";
// Components
import Logo from "../Logo";
import { Container, Content, Loader, LoaderContainer } from "./styles";

interface SplashProps {
  product?: "flags" | "forms";
}

const Splash = ({ product = "flags" }: SplashProps) => (
  <Container>
    <Content>
      <Logo size={42} product={product} />
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Content>
  </Container>
);

export default memo(Splash);
