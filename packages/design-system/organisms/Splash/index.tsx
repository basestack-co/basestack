import React, { memo } from "react";
// Components
import { Text } from "../../atoms";
import { Container, Content, Loader, LoaderContainer } from "./styles";

const Splash = () => (
  <Container>
    <Content>
      <Text
        size="xxLarge"
        fontFamily="robotoFlex"
        fontWeight={800}
        fontSize="32px"
        lineHeight={1.4}
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
