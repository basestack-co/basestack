import React, { useState } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { useMedia } from "react-use";
// UI
import { Text, Spinner } from "@basestack/design-system";
import Banners, { BannersItem } from "../Banners";
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

export interface Provider {
  [key: string]: {
    id: string;
    name: string;
    type: "oauth" | "email" | "credentials";
  };
}

type SignInProviders =
  | "github"
  | "apple"
  | "discord"
  | "facebook"
  | "microsoft"
  | "google"
  | "spotify"
  | "twitch"
  | "twitter"
  | "dropbox"
  | "kick"
  | "linkedin"
  | "gitlab"
  | "tiktok"
  | "reddit"
  | "roblox"
  | "vk"
  | "zoom";

export interface SignInProps {
  providers: Provider;
  isLoading?: boolean;
  title: string;
  slogan: string;
  action: (name: string) => string;
  description: string;
  contentTitle: string;
  contentDescription: string | React.ReactNode;
  onClickProvider: (provider: SignInProviders) => void;
  errors?: Array<BannersItem>;
}

export const getProvidersList: Provider = {
  github: {
    id: "github",
    name: "GitHub",
    type: "oauth",
  },
  google: {
    id: "google",
    name: "Google",
    type: "oauth",
  },
};

const NoImage = () => {
  return <div>No Image</div>;
};

const getProviderLogo = (provider: SignInProviders) => {
  const logo = {
    github: <Github />,
    auth0: <Auth0 />,
    google: <Google />,
    okta: <Okta />,
    microsoft: <Microsoft />,
    apple: <NoImage />,
    discord: <NoImage />,
    facebook: <NoImage />,
    spotify: <NoImage />,
    twitch: <NoImage />,
    twitter: <NoImage />,
    dropbox: <NoImage />,
    kick: <NoImage />,
    linkedin: <NoImage />,
    gitlab: <NoImage />,
    tiktok: <NoImage />,
    reddit: <NoImage />,
    roblox: <NoImage />,
    vk: <NoImage />,
    zoom: <NoImage />,
  };

  return logo[provider];
};

const SignIn = ({
  providers,
  isLoading = false,
  title,
  action,
  slogan,
  description,
  contentTitle,
  contentDescription,
  onClickProvider,
  errors,
}: SignInProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { colors, isDarkMode, device, spacing } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);

  return (
    <Container>
      <LeftContainer>
        <Text
          size="xLarge"
          fontWeight={700}
          lineHeight="1.6"
          color={colors[isDarkMode ? "gray200" : "white"]}
        >
          {title}
        </Text>
        <Text
          size="xxLarge"
          lineHeight="1.4"
          color={colors[isDarkMode ? "gray200" : "white"]}
          mt={isDesktop ? rem("120px") : spacing.s6}
          fontWeight={800}
        >
          {slogan}
        </Text>
        <Text
          size="medium"
          fontWeight={400}
          lineHeight="1.6"
          color={colors[isDarkMode ? "gray300" : "gray100"]}
          mt={spacing[isDesktop ? "s6" : "s4"]}
        >
          {description}
        </Text>
      </LeftContainer>
      <RightContainer>
        {(isLoading || isProcessing) && (
          <LoadingContainer>
            <Spinner size="large" />
          </LoadingContainer>
        )}
        {!!errors?.length && <Banners data={errors} />}
        <RightWrapper>
          <Text
            size="xxLarge"
            lineHeight="1.6"
            color={colors[isDarkMode ? "gray300" : "black"]}
          >
            {contentTitle}
          </Text>
          <Text
            size="medium"
            fontWeight={400}
            lineHeight="1.6"
            muted
            mt={spacing.s2}
          >
            {contentDescription}
          </Text>
          <CardsList>
            {Object.values(providers).map((provider) => (
              <CardsItem key={provider.name}>
                <ProviderCard
                  onClick={() => {
                    setIsProcessing(true);
                    onClickProvider(provider.id as SignInProviders);
                  }}
                  title={provider.name}
                  text={action(provider.name)}
                  providerLogo={getProviderLogo(
                    provider.name.toLowerCase() as SignInProviders,
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
