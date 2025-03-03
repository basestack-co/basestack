"use client";

import React from "react";
import { useStore } from "store";
// Router
import { useRouter } from "next/navigation";
// Utils
import { useDarkModeToggle } from "@basestack/hooks";
import { config as defaults, events } from "@basestack/utils";
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
// Utils
import { z } from "zod";
// Locales
import { useTranslations } from "next-intl";
// Toast
import { toast } from "sonner";

const { urls } = defaults;

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Required field")
    .email("This is not a valid email."),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

interface FooterLink {
  text: string;
  href: string;
  isExternal?: boolean;
}

interface FooterLinksSection {
  title: string;
  links: FooterLink[];
}

const FooterLinkItem: React.FC<FooterLink> = ({ text, href, isExternal }) => {
  const router = useRouter();

  const onHandleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    events.landing.link(text, href);
    if (isExternal) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <ListItem key={href} onClick={onHandleClick}>
      <StyledLink href={href}>{text}</StyledLink>
    </ListItem>
  );
};

const FooterLinksSection: React.FC<{ section: FooterLinksSection }> = ({
  section,
}) => {
  const { title, links } = section;

  return (
    <ListContainer>
      <Text size="medium">{title}</Text>
      <List>
        {links.map((link) => (
          <FooterLinkItem key={link.href} {...link} />
        ))}
      </List>
    </ListContainer>
  );
};

const FooterLinks: React.FC = () => {
  const t = useTranslations();

  const footerSections: FooterLinksSection[] = [
    {
      title: t("footer.section.products.title"),
      links: [
        {
          text: t("navigation.main.product.flags.title"),
          href: "/product/feature-flags",
        },
        {
          text: t("navigation.main.product.forms.title"),
          href: "/product/forms",
        },
      ],
    },
    {
      title: t("footer.section.resources.title"),
      links: [
        {
          text: t("footer.section.resources.blog"),
          href: urls.blog,
          isExternal: true,
        },
        {
          text: t("footer.section.resources.support"),
          href: urls.support,
          isExternal: true,
        },
        {
          text: t("footer.section.resources.system-status"),
          href: urls.status,
          isExternal: true,
        },
      ],
    },
    {
      title: t("footer.section.developers.title"),
      links: [
        {
          text: t("footer.section.developers.docs"),
          href: urls.docs.base,
          isExternal: true,
        },
        {
          text: t("footer.section.developers.contributing"),
          href: `${urls.docs.base}/contributing`,
          isExternal: true,
        },
        {
          text: t("footer.section.developers.open-source"),
          href: urls.repo,
          isExternal: true,
        },
        {
          text: t("footer.section.developers.self-hosting"),
          href: `${urls.docs.base}/self-hosting`,
          isExternal: true,
        },
      ],
    },
    {
      title: t("footer.section.company.title"),
      links: [
        {
          text: t("footer.section.company.privacy-policy"),
          href: "/legal/privacy",
        },
        {
          text: t("footer.section.company.cookies-policy"),
          href: "/legal/cookies",
        },
        {
          text: t("footer.section.company.term-of-use"),
          href: "/legal/terms",
        },
      ],
    },
  ];

  return (
    <RightContainer>
      {footerSections.map((section) => (
        <FooterLinksSection key={section.title} section={section} />
      ))}
    </RightContainer>
  );
};

const Footer = () => {
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { toggleDarkMode } = useDarkModeToggle();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
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

      toast.success(t("common.toast.newsletter.success"));

      events.landing.newsletter(
        "Subscribe Success",
        "Subscribe with success to the Newsletter",
      );
      reset();
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
      events.landing.newsletter("Subscribe Error", message);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <HorizontalRule isDarker={!isDarkMode} />
        <MainContent>
          <LeftContainer>
            <Logo product="company" size={36} isOnDark={isDarkMode} />
            <Text
              size="medium"
              fontWeight={400}
              mt={theme.spacing.s6}
              mb={theme.spacing.s2}
            >
              {t("footer.newsletter.title")}
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
                {t("footer.newsletter.action")}
              </Button>
            </InputContainer>
          </LeftContainer>
          <FooterLinks />
        </MainContent>
        <HorizontalRule isDarker={!isDarkMode} />
        <BottomContainer>
          <Text size="small" muted>
            {t("footer.company", {
              year: new Date().getFullYear(),
              portugal: "🇵🇹",
              europe: "🇪🇺",
            })}
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
