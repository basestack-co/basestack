import React, { useState } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { useMediaQuery } from "@basestack/hooks";
// Auth
import { signIn } from "next-auth/react";
// UI
import { Text, Spinner } from "@basestack/design-system";
// Types
import { Provider } from "types/nextAuth";
// Components
import ProviderCard from "./ProviderCard";
import { Github, Auth0, Google, Okta, Microsoft } from "./icons";
import {
  CardsItem,
  CardsList,
  Container,
  LeftContainer,
  LoadingContainer,
  RightContainer,
  RightWrapper,
} from "./styles";

interface SignInProps {
  providers: Provider;
  isLoading?: boolean;
}

type providers = "github" | "auth0" | "google" | "okta" | "microsoft";

const getProviderLogo = (provider: providers) => {
  const logo = {
    github: <Github />,
    auth0: <Auth0 />,
    google: <Google />,
    okta: <Okta />,
    microsoft: <Microsoft />,
  };

  return logo[provider];
};

const mockProviders = ["Okta", "Auth0", "Google", "Microsoft"];

const SignIn = ({ providers, isLoading = false }: SignInProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);

  return (
    <Container>
      <LeftContainer>
        <Text
          size="xLarge"
          fontWeight={700}
          lineHeight="1.6"
          fontFamily="robotoFlex"
          color={theme.colors.white}
        >
          Basestack
        </Text>
        <Text
          size="xxLarge"
          lineHeight="1.4"
          fontFamily="robotoFlex"
          color={theme.colors.white}
          mt={isDesktop ? rem("120px") : theme.spacing.s6}
          fontWeight={800}
        >
          The Open-Source Stack for Developers and Startups
        </Text>
        <Text
          size="medium"
          fontWeight={400}
          lineHeight="1.6"
          color={theme.colors.gray100}
          mt={theme.spacing[isDesktop ? "s6" : "s4"]}
        >
          Unlock Your Product Potential: Empower Your Team with Feature Flagging
        </Text>
      </LeftContainer>
      <RightContainer>
        {(isLoading || isProcessing) && (
          <LoadingContainer>
            <Spinner size="large" />
          </LoadingContainer>
        )}
        <RightWrapper>
          <Text size="xxLarge" lineHeight="1.6" color={theme.colors.black}>
            Choose the type of login
          </Text>
          <Text
            size="medium"
            fontWeight={400}
            lineHeight="1.6"
            muted
            mt={theme.spacing.s2}
          >
            Select Your Destination: Choose Your Login Service to Access.
          </Text>
          <CardsList>
            {Object.values(providers).map((provider) => (
              <CardsItem key={provider.name}>
                <ProviderCard
                  onClick={() => {
                    setIsProcessing(true);
                    signIn(provider.id, { callbackUrl: "/" });
                  }}
                  title={provider.name}
                  text={`Sign in with ${provider.name}`}
                  providerLogo={getProviderLogo(
                    provider.name.toLowerCase() as providers
                  )}
                />
              </CardsItem>
            ))}
            {mockProviders.map((provider) => {
              return (
                <CardsItem key={provider}>
                  <ProviderCard
                    onClick={() => console.log("yo")}
                    title={provider}
                    text={`Sign in with ${provider}`}
                    providerLogo={getProviderLogo(
                      provider.toLowerCase() as providers
                    )}
                  />
                </CardsItem>
              );
            })}
          </CardsList>
        </RightWrapper>
      </RightContainer>
    </Container>
  );
};

export default SignIn;
