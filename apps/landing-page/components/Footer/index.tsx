"use client";

// Components
import {
  Button,
  ButtonSize,
  ButtonVariant,
  HorizontalRule,
  IconButton,
  Input,
  Logo,
  Text,
} from "@basestack/design-system";
// Utils
import { useDarkModeToggle } from "@basestack/hooks";
import { config as defaults } from "@basestack/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React from "react";
// Form
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
import { useStore } from "store";
// Theme
import { useTheme } from "styled-components";
// Utils
import { z } from "zod";
import {
  BottomContainer,
  CompanyContainer,
  Container,
  ContentWrapper,
  InputContainer,
  LinksContainer,
  List,
  ListContainer,
  ListItem,
  LogoContainer,
  NewsletterContainer,
  NewsletterContent,
  StyledLink,
} from "./styles";

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
          href: `${urls.docs.base}/content/self-hosting/contributing`,
          isExternal: true,
        },
        {
          text: t("footer.section.developers.open-source"),
          href: urls.repo,
          isExternal: true,
        },
        {
          text: t("footer.section.developers.self-hosting"),
          href: `${urls.docs.base}/content/self-hosting`,
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
    <LinksContainer>
      {footerSections.map((section) => (
        <FooterLinksSection key={section.title} section={section} />
      ))}
    </LinksContainer>
  );
};

const Footer = () => {
  const t = useTranslations();
  const { isDarkMode, spacing } = useTheme();
  const { toggleDarkMode } = useDarkModeToggle();

  const setIsDarkMode = useStore((state) => state.setDarkMode);

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

      const data = await res.json();

      if (data.error) {
        toast.error(data.message);
      }

      if (data.code === 200) {
        toast.success(t("common.toast.newsletter.success"));
        reset();
      }
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <FooterLinks />
        <HorizontalRule isDarker={!isDarkMode} />
        <NewsletterContainer>
          <NewsletterContent>
            <Text size="xLarge" mb={spacing.s1}>
              {t("footer.newsletter.title")}
            </Text>
            <Text size="medium" fontWeight={400}>
              {t("footer.newsletter.text")}
            </Text>
          </NewsletterContent>
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
                  mr={spacing.s2}
                  maxWidth="240px"
                  width="100%"
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
        </NewsletterContainer>
        <HorizontalRule isDarker={!isDarkMode} />
        <BottomContainer>
          <CompanyContainer>
            <LogoContainer>
              <Logo product="company" size={32} isOnDark={isDarkMode} />
            </LogoContainer>
            <Text size="small" ml={spacing.s4} muted>
              {t("footer.company", {
                year: new Date().getFullYear(),
                portugal: "🇵🇹",
                europe: "🇪🇺",
              })}
            </Text>
          </CompanyContainer>
          <IconButton
            flexShrink={0}
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
