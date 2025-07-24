// Components
import {
  IconButton,
  Input,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useTheme } from "styled-components";
// Styles
import {
  Container,
  InputContainer,
  TextContainer,
  TooltipContainer,
} from "./styles";

export interface Props {
  formId: string;
}

const EndpointCard = ({ formId }: Props) => {
  const theme = useTheme();
  const t = useTranslations("form");
  const [showTooltipSuccess, setShowTooltipSuccess] = useState(false);

  const url = `${getBrowserUrl()}/api/v1/s/${formId}`;

  return (
    <Container>
      <TextContainer>
        <Text mb={theme.spacing.s1} size="large">
          {t("setup.card.endpoint.title")}
        </Text>
        <Text size="small" muted>
          {t("setup.card.endpoint.description")}
        </Text>
      </TextContainer>
      <InputContainer>
        <Input
          width="100%"
          placeholder=""
          name="url"
          onChange={() => null}
          value={url}
          isDarker
        />
        <TooltipContainer>
          <Tooltip placement="top-end">
            <TooltipTrigger onMouseLeave={() => setShowTooltipSuccess(false)}>
              <IconButton
                size="medium"
                variant="secondaryDark"
                icon="content_copy"
                onClick={async () => {
                  await navigator.clipboard.writeText(url);
                  setShowTooltipSuccess(true);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              {showTooltipSuccess
                ? t("setup.card.endpoint.copy.url.success")
                : t("setup.card.endpoint.copy.url.default")}
            </TooltipContent>
          </Tooltip>
        </TooltipContainer>
      </InputContainer>
    </Container>
  );
};

export default EndpointCard;
