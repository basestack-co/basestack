import React from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import { rem } from "polished";
import {
  InputGroup,
  HorizontalRule,
  Button,
  ButtonVariant,
  ButtonSize,
  Text,
} from "@basestack/design-system";
import SectionHeader, { TextAlign, AlignItems } from "../SectionHeader";
import {
  StyledForm,
  Col,
  Container,
  ContentContainer,
  ContentWrapper,
  FormWrapper,
  Row,
  StyledLink,
} from "./styles";
import { Card } from "../styles";

interface FormProps {
  header: { title: string; text: string; caption?: string };
  id?: string;
}

const FormComp = ({ header, id }: FormProps) => {
  const { device, spacing } = useTheme();
  const isMobile = useMedia(device.max.md, false);

  const headerProps = isMobile
    ? {}
    : {
        alignItems: "flex-start" as AlignItems,
        textAlign: "left" as TextAlign,
      };

  return (
    <Container id={id}>
      <ContentContainer>
        <ContentWrapper>
          <SectionHeader
            {...header}
            textMaxWidth={60}
            hasMarginBottom={isMobile}
            {...headerProps}
          />
        </ContentWrapper>
        <FormWrapper>
          <Card>
            <StyledForm>
              <Row>
                <Col>
                  <InputGroup
                    title="First Name"
                    inputProps={{
                      value: "",
                      name: "firstName",
                      placeholder: "First Name",
                      onChange: () => console.log(""),
                    }}
                  />
                </Col>
                <Col>
                  <InputGroup
                    title="Last Name"
                    inputProps={{
                      value: "",
                      name: "lastName",
                      placeholder: "Last Name",
                      onChange: () => console.log(""),
                    }}
                  />
                </Col>
              </Row>
              <InputGroup
                title="Email"
                inputProps={{
                  value: "",
                  name: "email",
                  placeholder: "Email",
                  onChange: () => console.log(""),
                }}
              />
              <InputGroup
                textarea
                title="Message"
                textareaProps={{
                  value: "",
                  name: "message",
                  placeholder: "Message",
                  onChange: () => console.log(""),
                }}
              />
              <HorizontalRule />
              <Button
                onClick={() => console.log("")}
                variant={ButtonVariant.Primary}
                size={ButtonSize.Medium}
                fullWidth
                justifyContent="center"
              >
                Contact
              </Button>
              <Text muted>
                By submitting this form, I confirm that I have read and
                understood the Privacy Policy.
              </Text>
            </StyledForm>
          </Card>
          <Text
            textAlign="center"
            mt={spacing.s5}
            lineHeight={rem("22px")}
            muted
          >
            Powered by {""}
            <StyledLink href="/product/feature-flags">
              Basestack Forms
            </StyledLink>
          </Text>
        </FormWrapper>
      </ContentContainer>
    </Container>
  );
};

export default FormComp;
