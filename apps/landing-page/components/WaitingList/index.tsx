import { Button, ButtonSize, Text } from "@basestack/design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// Styles
import { rem } from "polished";
import { useEffect, useRef, useState } from "react";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
// Utils
import { z } from "zod";
// Components
import Image from "../Image";
import SlideCard from "../SlideCard";
import {
  CardsContainer,
  CardWrapper,
  Container,
  ContentContainer,
  ErrorContainer,
  ErrorText,
  Footer,
  Grid,
  Header,
  ImageContainer,
  Input,
  InputContainer,
  InputWrapper,
  LeftCol,
  TextContainer,
} from "./styles";

interface WaitingListProps {
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Required field")
    .email("This is not a valid email."),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const WaitingList = ({ data }: WaitingListProps) => {
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const image = {
    src: data[currentImage].image.src,
    alt: data[currentImage].image.alt,
  };

  useEffect(() => {
    if (cardRef.current && isMobile) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [isMobile]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentImage + 1) % data.length;
      setCurrentImage(nextIndex);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentImage, data]);

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
        includeListId: "4", // Feature Flags Early Access
        email: input.email,
        // templateId: "1", // Default Template Double opt-in confirmation
        // redirectionUrl,
      });

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_EMAIL_SERVICE
        }/contacts/create?${params.toString()}`,
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

      reset();
    } catch (error) {
      const { message } = error as Error;
      console.error(message);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Header>
          <Text size="xxLarge" fontWeight={700} lineHeight="1.6">
            Basestack
          </Text>
        </Header>

        <TextContainer>
          <Text
            size="xxLarge"
            fontSize={rem("60px")}
            lineHeight="1.2"
            fontFamily="robotoFlex"
            // @ts-ignore
            as="h1"
            color={theme.colors.black}
            mb={theme.spacing.s5}
            fontWeight={800}
          >
            The Open-Source Stack for Developers and Startups
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
            include Feedback, Forms, and more to help you build better Products!
          </Text>
        </TextContainer>

        <Grid>
          <LeftCol>
            <InputContainer>
              <InputWrapper>
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
              </InputWrapper>

              <ErrorContainer>
                <ErrorText
                  size="small"
                  color={
                    errors.email ? theme.colors.red400 : theme.colors.gray500
                  }
                >
                  {errors.email?.message || "Be an early adopter!"}
                </ErrorText>
              </ErrorContainer>

              {!!errors.email?.message && (
                <ErrorContainer>
                  <ErrorText
                    size="small"
                    color={
                      errors.email ? theme.colors.red400 : theme.colors.gray500
                    }
                  >
                    {errors.email?.message}
                  </ErrorText>
                </ErrorContainer>
              )}
            </InputContainer>
            <CardsContainer>
              {data?.map((item, index) => (
                <CardWrapper
                  key={index}
                  ref={index === currentImage ? cardRef : null}
                >
                  <SlideCard
                    isActive={index === currentImage}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                    onClick={() => {
                      setCurrentImage(index);
                    }}
                  />
                </CardWrapper>
              ))}
            </CardsContainer>
          </LeftCol>
          <ImageContainer>
            <Image src={image.src} alt={image.alt} />
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
