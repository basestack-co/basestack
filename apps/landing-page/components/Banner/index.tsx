import React from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import SectionHeader, { SectionHeaderProps } from "../SectionHeader";
import {
  Container,
  ContentContainer,
  BannerContent,
  ButtonsContainer,
  StyledCard,
} from "./styles";

export interface Props {
  id?: string;
  title: SectionHeaderProps["title"];
  text?: SectionHeaderProps["text"];
  titleMaxWidth?: SectionHeaderProps["titleMaxWidth"];
  textMaxWidth?: SectionHeaderProps["textMaxWidth"];
  label?: SectionHeaderProps["label"];
  buttons: Array<{ text: string; onClick: () => void }>;
}

const BannerComp = ({
  id,
  title,
  text,
  buttons,
  titleMaxWidth = 60,
  textMaxWidth = 60,
  label,
}: Props) => {
  const { device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container id={id}>
      <ContentContainer>
        <StyledCard>
          <BannerContent>
            <SectionHeader
              title={title}
              text={text}
              hasMarginBottom={false}
              titleMaxWidth={titleMaxWidth}
              textMaxWidth={textMaxWidth}
              label={label}
            />
            <ButtonsContainer>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick}
                  size={ButtonSize.Medium}
                  variant={
                    index === 0
                      ? ButtonVariant.Secondary
                      : ButtonVariant.Outlined
                  }
                  fullWidth={isMobile}
                  justifyContent="center"
                >
                  {button.text}
                </Button>
              ))}
            </ButtonsContainer>
          </BannerContent>
        </StyledCard>
      </ContentContainer>
    </Container>
  );
};

export default BannerComp;
