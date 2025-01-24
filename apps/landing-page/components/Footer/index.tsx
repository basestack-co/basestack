import React from "react";
import { useStore } from "store";
// Router
import { useRouter } from "next/navigation";
// Utils
import { useDarkModeToggle } from "@basestack/hooks";
import { events } from "@basestack/utils";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Theme
import { useTheme } from "styled-components";
// Components
import {
  Text,
  Button,
  ButtonSize,
  HorizontalRule,
  Logo,
  IconButton,
  Input,
  ButtonVariant,
} from "@basestack/design-system";
import {
  Container,
  InputContainer,
  List,
  ListItem,
  ListContainer,
  RightContainer,
  LeftContainer,
  ContentWrapper,
  MainContent,
  BottomContainer,
  StyledLink,
} from "./styles";
import { z } from "zod";

const products = [
  {
    text: "Feature Flags",
    href: "/flags",
  },
  {
    text: "Forms",
    href: "/forms",
  },
];

const links = [
  {
    text: "Privacy Policy",
    href: "/legal/privacy",
  },
  {
    text: "Cookies Policy",
    href: "/legal/cookies",
  },
  {
    text: "Term of Use",
    href: "/legal/terms",
  },
];

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Required field")
    .email("This is not a valid email."),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const Footer = () => {
  const theme = useTheme();
  const router = useRouter();
  const { toggleDarkMode } = useDarkModeToggle();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInputs> = async (input: FormInputs) => {
    if (!process.env.NEXT_PUBLIC_FORM_UPDATES_ENDPOINT) return;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORM_UPDATES_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input.email }),
      });

      await res.json();

      events.landing.newsletter(
        "Subscribe Success",
        "Subscribe with success to the Newsletter",
      );
      reset();
    } catch (error) {
      const { message } = error as Error;

      events.landing.newsletter("Subscribe Error", message);
    }
  };

  return (
    <Container>
      <HorizontalRule isDarker={!isDarkMode} />
      <ContentWrapper>
        <MainContent>
          <LeftContainer>
            <Logo product="company" isOnDark={isDarkMode} />
            <Text
              size="medium"
              fontWeight={400}
              mt={theme.spacing.s6}
              mb={theme.spacing.s2}
            >
              Get updates directly to your Inbox
            </Text>
            <InputContainer>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    isDarker={!isDarkMode}
                    placeholder="Enter your email"
                    type="email"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isDisabled={isSubmitting}
                    mr={theme.spacing.s2}
                  />
                )}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                size={ButtonSize.Medium}
                variant={ButtonVariant.Tertiary}
                height="44px"
              >
                Subscribe
              </Button>
            </InputContainer>
          </LeftContainer>
          <RightContainer>
            <ListContainer>
              <Text size="medium">Products</Text>
              <List>
                {products.map((link, index) => (
                  <ListItem
                    key={index.toString()}
                    onClick={() => {
                      events.landing.link(link.text, link.href);
                      router.push(link.href);
                    }}
                  >
                    <StyledLink href={link.href}>{link.text}</StyledLink>
                  </ListItem>
                ))}
              </List>
            </ListContainer>

            <ListContainer>
              <Text size="medium">Docs</Text>
              <List>
                {links.map((link, index) => (
                  <ListItem
                    key={index.toString()}
                    onClick={() => {
                      events.landing.link(link.text, link.href);
                      router.push(link.href);
                    }}
                  >
                    <StyledLink href={link.href}>{link.text}</StyledLink>
                  </ListItem>
                ))}
              </List>
            </ListContainer>

            <ListContainer>
              <Text size="medium">Company</Text>
              <List>
                {links.map((link, index) => (
                  <ListItem
                    key={index.toString()}
                    onClick={() => {
                      events.landing.link(link.text, link.href);
                      router.push(link.href);
                    }}
                  >
                    <StyledLink href={link.href}>{link.text}</StyledLink>
                  </ListItem>
                ))}
              </List>
            </ListContainer>
          </RightContainer>
        </MainContent>

        <HorizontalRule isDarker={!isDarkMode} mt={theme.spacing.s8} />
        <BottomContainer>
          <Text size="small" muted>
            © Basestack {new Date().getFullYear()}. All rights reserved.
          </Text>

          <IconButton
            icon={isDarkMode ? "light_mode" : "dark_mode"}
            size="medium"
            onClick={() => {
              toggleDarkMode(!isDarkMode, "bottom-right").then(() => {
                setIsDarkMode(!isDarkMode);
              });
            }}
          />
        </BottomContainer>
      </ContentWrapper>
    </Container>
  );
};

export default Footer;
