import {
  Button,
  ButtonSize,
  ButtonVariant,
  HorizontalRule,
  InputGroup,
  Text,
} from "@basestack/design-system";
import { zodResolver } from "@hookform/resolvers/zod";
// Locales
import { useTranslations } from "next-intl";
import { rem } from "polished";
import { useMemo } from "react";
// Form
import {
  Controller,
  type SubmitHandler,
  type UseFormReset,
  useForm,
} from "react-hook-form";
// Hooks
import { useMedia } from "react-use";
// Components
import { useTheme } from "styled-components";
import { z } from "zod";
import SectionHeader, {
  type AlignItems,
  type SectionHeaderProps,
  type TextAlign,
} from "../SectionHeader";
import { Card } from "../styles";
// Styles
import {
  Col,
  Container,
  ContentContainer,
  ContentWrapper,
  FormWrapper,
  Row,
  StyledForm,
  StyledLink,
} from "./styles";

export const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  email: z.string().email("Invalid email format"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface FormProps {
  header: SectionHeaderProps;
  id?: string;
  onSave: (inputs: FormInputs, reset: UseFormReset<FormInputs>) => void;
}

const FormComp = ({ header, id, onSave }: FormProps) => {
  const t = useTranslations();
  const { device, spacing } = useTheme();
  const isMobile = useMedia(device.max.md, false);

  const headerProps = useMemo(
    () =>
      isMobile
        ? {}
        : {
            alignItems: "flex-start" as AlignItems,
            textAlign: "left" as TextAlign,
          },
    [isMobile],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (inputs) => onSave(inputs, reset);

  return (
    <Container id={id}>
      <ContentContainer>
        <ContentWrapper>
          <SectionHeader
            textMaxWidth={60}
            titleMaxWidth={25}
            hasMarginBottom={isMobile}
            {...headerProps}
            {...header}
          />
        </ContentWrapper>
        <FormWrapper>
          <Card>
            <StyledForm>
              <Row>
                <Col>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputGroup
                        title={t("common.form.contact.input.first-name.label")}
                        hint={errors?.firstName?.message}
                        inputProps={{
                          name: field.name,
                          value: field.value as string,
                          onChange: field.onChange,
                          onBlur: field.onBlur,
                          placeholder: t(
                            "common.form.contact.input.first-name.placeholder",
                          ),
                          hasError: !!errors.firstName,
                          isDisabled: isSubmitting,
                        }}
                      />
                    )}
                  />
                </Col>
                <Col>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputGroup
                        title={t("common.form.contact.input.last-name.label")}
                        hint={errors?.lastName?.message}
                        inputProps={{
                          name: field.name,
                          value: field.value as string,
                          onChange: field.onChange,
                          onBlur: field.onBlur,
                          placeholder: t(
                            "common.form.contact.input.last-name.placeholder",
                          ),
                          hasError: !!errors.lastName,
                          isDisabled: isSubmitting,
                        }}
                      />
                    )}
                  />
                </Col>
              </Row>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputGroup
                    title={t("common.form.contact.input.company-email.label")}
                    hint={errors?.email?.message}
                    inputProps={{
                      name: field.name,
                      value: field.value as string,
                      onChange: field.onChange,
                      onBlur: field.onBlur,
                      placeholder: t(
                        "common.form.contact.input.company-email.placeholder",
                      ),
                      hasError: !!errors.email,
                      isDisabled: isSubmitting,
                    }}
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputGroup
                    textarea
                    title={t("common.form.contact.input.description.label")}
                    hint={errors?.message?.message}
                    textareaProps={{
                      name: field.name,
                      value: field.value as string,
                      onChange: field.onChange,
                      onBlur: field.onBlur,
                      placeholder: t(
                        "common.form.contact.input.description.placeholder",
                      ),
                      hasError: !!errors.message,
                      isDisabled: isSubmitting,
                    }}
                  />
                )}
              />
              <HorizontalRule />
              <Button
                onClick={handleSubmit(onSubmit)}
                variant={ButtonVariant.Primary}
                size={ButtonSize.Medium}
                fullWidth
                justifyContent="center"
              >
                {t("common.form.contact.action.submit")}
              </Button>
              <Text muted>{t("common.form.contact.note.privacy-policy")}</Text>
            </StyledForm>
          </Card>
          <Text
            textAlign="center"
            mt={spacing.s5}
            lineHeight={rem("22px")}
            muted
          >
            {t("common.form.contact.note.powered-by")} {""}
            <StyledLink href="/product/forms">
              {t("common.form.contact.note.forms")}
            </StyledLink>
          </Text>
        </FormWrapper>
      </ContentContainer>
    </Container>
  );
};

export default FormComp;
