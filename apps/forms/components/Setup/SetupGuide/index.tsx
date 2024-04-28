import React, { useState, useCallback } from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
// Theme
import { useTheme } from "styled-components";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Components
import { CodeLanguageCard } from "@basestack/ui";
import { Text, Card } from "@basestack/design-system";
// Styles
import { List, ListItem } from "./styles";
// Utils
import { data } from "./utils";
// Steps
import DefaultStep from "./DefaultStep";
import JavascriptStep from "./JavascriptStep";
import ReactStep from "./ReactStep";
import VueStep from "./VueStep";
import RestStep from "./RestStep";

SyntaxHighlighter.registerLanguage("typescript", ts);

export interface Props {
  formId: string;
}

const SetupGuide = ({ formId }: Props) => {
  const [step, setStep] = useState(0);
  const theme = useTheme();
  const { t } = useTranslation("forms");

  const onRenderStep = useCallback(() => {
    const endpoint = `${getBrowserUrl()}/api/v1/s/${formId}`;
    const props = { endpoint };

    const steps: { [key: number]: React.ReactNode } = {
      0: <DefaultStep {...props} />,
      1: <JavascriptStep {...props} />,
      2: <ReactStep {...props} />,
      3: <VueStep {...props} />,
      4: <RestStep {...props} />,
    };

    return steps[step];
  }, [step, formId]);

  return (
    <Card p={theme.spacing.s5}>
      <Text mb={theme.spacing.s1} size="large">
        {t("setup.card.guide.title")}
      </Text>
      <Text size="small" muted>
        {t("setup.card.guide.description")}
      </Text>

      <Text mt={theme.spacing.s5} mb={theme.spacing.s3} size="large">
        {t("setup.card.guide.platform")}
      </Text>
      <List>
        {data.map(({ id, i18nKey }, index) => (
          <ListItem key={id}>
            <CodeLanguageCard
              text={t(i18nKey)}
              icon={id}
              onSelect={() => setStep(index)}
              isSelected={step === index}
            />
          </ListItem>
        ))}
      </List>
      {onRenderStep()}
    </Card>
  );
};

export default SetupGuide;
