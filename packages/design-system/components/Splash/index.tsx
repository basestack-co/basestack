import React, { memo } from "react";
// Components
import Logo from "../Logo";
import { Container, Content, Loader, LoaderContainer } from "./styles";

const Splash = () => (
  <Container>
    <Content>
      <Logo size={42} />
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Content>
  </Container>
);

export default memo(Splash);
