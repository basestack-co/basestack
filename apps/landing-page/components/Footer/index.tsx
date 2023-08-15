import React from "react";
// Router
import { useRouter } from "next/router";
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
import toast from "react-hot-toast";

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
    try {
      const params = new URLSearchParams({
        includeListId: "4",
        email: input.email,
        templateId: "1", // Default Template Double opt-in confirmation
        redirectionUrl: "https://basestack.co",
      });

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_EMAIL_SERVICE
        }/email/subscribe?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (data.code === "permission_denied" || data.error) {
        throw new Error(data.message);
      }

      events.landing.newsletter(
        "Subscribe Success",
        "Subscribe with success to the Newsletter",
      );
      toast.success("Thank you for your interest! We will be in touch soon.");
      reset();
    } catch (error) {
      const { message } = error as Error;

      events.landing.newsletter("Subscribe Error", message);
      toast.error(message ?? "Something went wrong, please try again.");
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
                © Basestack 2023
              </Text>
            </CopyWrightContainer>
            <List>
              {links.map((link, index) => {
                return (
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
                );
              })}
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
