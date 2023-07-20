import React, { memo } from "react";
// Components
import Text from "../Text";
import { Container, Content, Loader, LoaderContainer } from "./styles";

const Splash = () => (
  <Container>
    <Content>
      <Text
        size="xLarge"
        fontWeight={700}
        lineHeight="1.6"
        fontFamily="robotoFlex"
      >
        MoonFlags
      </Text>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Content>
  </Container>
);

export default memo(Splash);
