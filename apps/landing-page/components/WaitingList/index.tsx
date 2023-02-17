import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Components
import Image from "../Image";
import Logo from "../Logo";
import { Button, ButtonSize, Text } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  ImageContainer,
  TextContainer,
  Input,
  InputContainer,
  Header,
  Grid,
  Footer,
} from "./styles";

const WaitingList = () => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <Header>
          <Logo />
        </Header>
        <Grid>
          <TextContainer>
            <Text
              size="xxLarge"
              fontSize={rem("60px")}
              lineHeight="1.4"
              fontFamily="robotoFlex"
              // @ts-ignore
              as="h1"
              color={theme.colors.black}
              mb={theme.spacing.s5}
            >
              Feature Flag Service
            </Text>
            <Text
              size="xxLarge"
              fontWeight={400}
              lineHeight="1.6"
              // @ts-ignore
              as="p"
              color={theme.colors.gray500}
            >
              Release features with confidence, manage feature flags across web,
              mobile, and server side applications.
            </Text>
            <InputContainer>
              <Input placeholder="Enter your email" />
              <Button
                onClick={() => console.log("yeah")}
                size={ButtonSize.Medium}
                flexShrink={0}
                icon="arrow_forward"
              >
                Join the waitlist
              </Button>
            </InputContainer>
          </TextContainer>
          <ImageContainer>
            <Image
              src="https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </ImageContainer>
        </Grid>
        <Footer>
          <Text size="medium" fontWeight={400} muted>
            © MoonFlags 2023. All rights reserved.
          </Text>
        </Footer>
      </ContentContainer>
    </Container>
  );
};

export default WaitingList;
