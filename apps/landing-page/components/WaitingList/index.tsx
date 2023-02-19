import React from "react";
import Link from "next/link";
// Styles
import { rem } from "polished";
import { useTheme } from "styled-components";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Utils
import { z } from "zod";
import { redirectionUrl } from "utils/constants";
import toast from "react-hot-toast";
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

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Required field")
    .email("This is not a valid email."),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const WaitingList = () => {
  const theme = useTheme();

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
        includeListIds: "4", // Feature Flags Early Access
        email: input.email,
        templateId: "1", // Default Template Double opt-in confirmation
        redirectionUrl,
      });

      const res = await fetch(
        `https://basestack-email.vercel.app/api/v1/email/subscribe?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.code === "permission_denied" || data.error) {
        throw new Error(data.message);
      }

      reset();
      toast.success("Successfully subscribed! Check your email!");
    } catch (error) {
      const { message } = error as Error;
      toast.error(message ?? "Something went wrong, please try again.");
    }
  };

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
              The Essential Stack for Developers and Startups
            </Text>
            <Text
              size="xxLarge"
              fontWeight={400}
              lineHeight="1.6"
              // @ts-ignore
              as="p"
              color={theme.colors.gray500}
            >
              Feature Flags are just the beginning: Our Suite of Tools will
              include Feedback, Forms, and more to help you build better
              Products!
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
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                size={ButtonSize.Medium}
                flexShrink={0}
                {...(isSubmitting ? {} : { icon: "arrow_forward" })}
              >
                Get Early Access
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
            © Basestack {new Date().getFullYear()}. All rights reserved.{" "}
            <Link style={{ color: "black" }} href="/legal/privacy">
              Privacy Policy
            </Link>
          </Text>
        </Footer>
      </ContentContainer>
    </Container>
  );
};

export default WaitingList;
