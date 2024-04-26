import React, { useState } from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import {
  Text,
  Input,
  IconButton,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@basestack/design-system";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Styles
import { Container, InputContainer, TextContainer } from "./styles";

export interface Props {
  formId: string;
}

const EndpointCard = ({ formId }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("forms");
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
        <Tooltip placement="top">
          <TooltipTrigger onMouseLeave={() => setShowTooltipSuccess(false)}>
            <IconButton
              position="absolute"
              size="medium"
              variant="secondaryDark"
              right={rem("6px")}
              icon="content_copy"
              onClick={() => {
                navigator.clipboard.writeText(url);
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
      </InputContainer>
    </Container>
  );
};

export default EndpointCard;
