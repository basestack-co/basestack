import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";
// Theme
import { useTheme } from "styled-components";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Code
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Components
import { CodeLanguageCard } from "@basestack/ui";
import { Text, Card, Spinner } from "@basestack/design-system";
// Styles
import { List, ListItem } from "./styles";
// Utils
import { data, getSyntax } from "./utils";
// Steps
import DefaultStep from "./DefaultStep";
import JavascriptStep from "./JavascriptStep";
import ReactStep from "./ReactStep";
import VueStep from "./VueStep";
import RestStep from "./RestStep";
// Dynamic imports
// @ts-ignore
const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"), {
  loading: () => <Spinner size="small" />,
});

export interface Props {
  formId: string;
}

const SetupGuide = ({ formId }: Props) => {
  const [step, setStep] = useState(0);
  const theme = useTheme();
  const t = useTranslations("form");

  const onRenderStep = useCallback(() => {
    const endpoint = `${getBrowserUrl()}/api/v1/s/${formId}`;
    const syntax = getSyntax(endpoint, step);
    const children = (
      <SyntaxHighlighter
        language={syntax.language}
        style={theme.isDarkMode ? a11yDark : a11yLight}
        wrapLongLines
      >
        {syntax.code}
      </SyntaxHighlighter>
    );

    const props = { endpoint, children };

    const steps: { [key: number]: React.ReactNode } = {
      0: <DefaultStep {...props} />,
      1: <JavascriptStep {...props} />,
      2: <ReactStep {...props} />,
      3: <VueStep {...props} />,
      4: <RestStep {...props} />,
    };

    return steps[step];
  }, [step, formId, theme.isDarkMode]);

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
              text={t(i18nKey as NamespaceKeys<string, "form">)}
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
