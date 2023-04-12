import React, { useEffect } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
// Auth
import { signIn, useSession, getProviders } from "next-auth/react";
// Router
import { useRouter } from "next/router";
// UI
import { Text } from "@basestack/design-system";
// Types
import { Provider } from "types/nextAuth";
// Components
import ProviderCard from "./ProviderCard";
import {
  CardsItem,
  CardsList,
  Container,
  LeftContainer,
  RightContainer,
} from "./styles";

interface Props {
  providers: Provider;
}

const getProviderLogo = (provider: string) => {
  switch (provider) {
    case "github": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 98 96"
          width="auto"
          height="48"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#24292f"
          />
        </svg>
      );
    }
    case "okta": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="auto"
          height="48"
        >
          <path
            d="M32 0C14.37 0 0 14.267 0 32s14.268 32 32 32 32-14.268 32-32S49.63 0 32 0zm0 48c-8.866 0-16-7.134-16-16s7.134-16 16-16 16 7.134 16 16-7.134 16-16 16z"
            fill="#007dc1"
          />
        </svg>
      );
    }
    case "auth0": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="auto"
          height="48"
        >
          <path
            d="M49.012 51.774L42.514 32l17.008-12.22h-21.02L32.005 0h21.032l6.506 19.78c3.767 11.468-.118 24.52-10.53 31.993zm-34.023 0L31.998 64l17.015-12.226-17.008-12.22zm-10.516-32c-3.976 12.1.64 24.917 10.5 32.007v-.007L21.482 32 4.474 19.774l21.025.007L31.998 0H10.972z"
            fill="#eb5424"
          />
        </svg>
      );
    }
    case "google": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="auto"
          height="48"
        >
          <defs>
            <path
              id="A"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
          </defs>
          <clipPath id="B">
            <use xlinkHref="#A" />
          </clipPath>
          <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
            <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
            <path
              d="M0 11l17 13 7-6.1L48 14V0H0z"
              clipPath="url(#B)"
              fill="#ea4335"
            />
            <path
              d="M0 37l30-23 7.9 1L48 0v48H0z"
              clipPath="url(#B)"
              fill="#34a853"
            />
            <path
              d="M48 48L17 24l-4-3 35-10z"
              clipPath="url(#B)"
              fill="#4285f4"
            />
          </g>
        </svg>
      );
    }
    case "microsoft": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="auto"
          height="48"
        >
          <path d="M0 0h15.206v15.206H0z" fill="#f25022" />
          <path d="M16.794 0H32v15.206H16.794z" fill="#7fba00" />
          <path d="M0 16.794h15.206V32H0z" fill="#00a4ef" />
          <path d="M16.794 16.794H32V32H16.794z" fill="#ffb900" />
        </svg>
      );
    }
  }
};

const SignInPage = ({ providers }: Props) => {
  const theme = useTheme();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

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
          mt={rem("120px")}
          fontWeight={800}
        >
          The Open-Source Stack for Developers and Startups
        </Text>
        <Text
          size="medium"
          fontWeight={400}
          lineHeight="1.6"
          color={theme.colors.gray100}
          mt={theme.spacing.s6}
        >
          Unlock Your Product Potential: Empower Your Team with Feature Flagging
        </Text>
      </LeftContainer>
      <RightContainer>
        <Text
          size="xxLarge"
          fontWeight={400}
          lineHeight="1.6"
          color={theme.colors.black}
        >
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
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                title={provider.name}
                text={`Sign in with ${provider.name}`}
                providerLogo={getProviderLogo(provider.name.toLowerCase())}
              />
            </CardsItem>
          ))}
          <CardsItem>
            <ProviderCard
              onClick={() => console.log("yo")}
              title="Okta"
              text="Sign in with Okta"
              providerLogo={getProviderLogo("okta")}
            />
          </CardsItem>
          <CardsItem>
            <ProviderCard
              onClick={() => console.log("yo")}
              title="Auth0"
              text="Sign in with Auth0"
              providerLogo={getProviderLogo("auth0")}
            />
          </CardsItem>
          <CardsItem>
            <ProviderCard
              onClick={() => console.log("yo")}
              title="Google"
              text="Sign in with Google"
              providerLogo={getProviderLogo("google")}
            />
          </CardsItem>
          <CardsItem>
            <ProviderCard
              onClick={() => console.log("yo")}
              title="Microsoft"
              text="Sign in with Microsoft"
              providerLogo={getProviderLogo("microsoft")}
            />
          </CardsItem>
        </CardsList>
      </RightContainer>
    </Container>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignInPage;
