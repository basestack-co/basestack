import React, { useState } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { useMedia } from "react-use";
// Auth
import { signIn } from "next-auth/react";
// UI
import { Text, Spinner } from "@basestack/design-system";
// Types
import { Provider } from "types/nextAuth";
// Locales
import useTranslation from "next-translate/useTranslation";
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

const SignIn = ({ providers, isLoading = false }: SignInProps) => {
  const { t } = useTranslation("auth");
  const [isProcessing, setIsProcessing] = useState(false);
  const { colors, isDarkMode, device, spacing } = useTheme();
  const isDesktop = useMedia(device.min.lg, false);

  return (
    <Container>
      <LeftContainer>
        <Text
          size="xLarge"
          fontWeight={700}
          lineHeight="1.6"
          fontFamily="robotoFlex"
          color={colors[isDarkMode ? "gray200" : "white"]}
        >
          {t("sign-in.panel.title")}
        </Text>
        <Text
          size="xxLarge"
          lineHeight="1.4"
          fontFamily="robotoFlex"
          color={colors[isDarkMode ? "gray200" : "white"]}
          mt={isDesktop ? rem("120px") : spacing.s6}
          fontWeight={800}
        >
          {t("sign-in.panel.slogan")}
        </Text>
        <Text
          size="medium"
          fontWeight={400}
          lineHeight="1.6"
          color={colors[isDarkMode ? "gray300" : "gray100"]}
          mt={spacing[isDesktop ? "s6" : "s4"]}
        >
          {t("sign-in.panel.description")}
        </Text>
      </LeftContainer>
      <RightContainer>
        {(isLoading || isProcessing) && (
          <LoadingContainer>
            <Spinner size="large" />
          </LoadingContainer>
        )}
        <RightWrapper>
          <Text
            size="xxLarge"
            lineHeight="1.6"
            color={colors[isDarkMode ? "gray300" : "black"]}
          >
            {t("sign-in.content.title")}
          </Text>
          <Text
            size="medium"
            fontWeight={400}
            lineHeight="1.6"
            muted
            mt={spacing.s2}
          >
            {t("sign-in.content.description")}
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
                  text={t("sign-in.content.action", { name: provider.name })}
                  providerLogo={getProviderLogo(
                    provider.name.toLowerCase() as providers,
                  )}
                />
              </CardsItem>
            ))}
          </CardsList>
        </RightWrapper>
      </RightContainer>
    </Container>
  );
};

export default SignIn;
