import React from "react";
// Router
import { useRouter } from "next/navigation";
// Utils
import { events } from "@basestack/utils";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Theme
import { useTheme } from "styled-components";
// Components
import { Text, Button, ButtonSize } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  Input,
  InputContainer,
  LeftColumn,
  LeftColumnContent,
  List,
  ListItem,
  RightColumn,
  CopyWrightContainer,
} from "./styles";
import { z } from "zod";

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
      <ContentContainer>
        <LeftColumn>
          <Text
            size="xLarge"
            color={theme.colors.gray300}
            mb={theme.spacing.s2}
          >
            The Open-Source Stack for Developers and Startups
          </Text>
          <LeftColumnContent>
            <CopyWrightContainer>
              <Text size="medium" fontWeight={400} color={theme.colors.gray300}>
                © Basestack {new Date().getFullYear()}. All rights reserved.
              </Text>
            </CopyWrightContainer>
            <List>
              {links.map((link, index) => (
                <ListItem
                  key={index.toString()}
                  onClick={() => {
                    events.landing.link(link.text, link.href);
                    router.push(link.href);
                  }}
                >
                  <Text
                    size="medium"
                    fontWeight={400}
                    color={theme.colors.gray300}
                  >
                    {link.text}
                  </Text>
                </ListItem>
              ))}
            </List>
          </LeftColumnContent>
        </LeftColumn>
        <RightColumn>
          <Text
            size="medium"
            fontWeight={400}
            color={theme.colors.gray300}
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
                  placeholder="Enter your email"
                  type="email"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={isSubmitting}
                />
              )}
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              size={ButtonSize.Medium}
            >
              Subscribe
            </Button>
          </InputContainer>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};

export default Footer;
