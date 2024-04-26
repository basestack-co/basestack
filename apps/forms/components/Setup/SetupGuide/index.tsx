import React, { useCallback, useState } from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
// Theme
import { useTheme } from "styled-components";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Components
import { CodeLanguageCard } from "@basestack/ui";
import { Text, Card } from "@basestack/design-system";
import Step from "./Step";
import { CodeContainer, List, ListItem } from "./styles";
import { data, getHtmlDemoCode } from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

export interface Props {
  formId: string;
}

const SetupGuide = ({ formId }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const theme = useTheme();
  const { t } = useTranslation("forms");

  const url = `${getBrowserUrl()}/api/v1/s/${formId}`;

  const parseDescription = useCallback((description: string) => {
    const parts = description.split(/\[(.*?)\]/).filter(Boolean);

    return parts.map((part: string, index: number) => ({
      text: part.trim(),
      highlight: index % 2 === 1,
    }));
  }, []);

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
        {data.map(({ id, text }, index) => (
          <ListItem key={id}>
            <CodeLanguageCard
              text={text}
              icon={id}
              onSelect={() => setSelectedLanguage(index)}
              isSelected={selectedLanguage === index}
            />
          </ListItem>
        ))}
      </List>
      <Step
        step={1}
        title={t("setup.card.guide.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.step-1.description", {
            url,
            method: "POST",
          }),
        )}
      />
      <Step
        step={2}
        title={t("setup.card.guide.step-2.title")}
        description={parseDescription(t("setup.card.guide.step-2.description"))}
      />
      <Step
        step={3}
        title={t("setup.card.guide.step-3.title")}
        description={parseDescription(t("setup.card.guide.step-3.description"))}
      >
        <CodeContainer>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="html"
            style={theme.isDarkMode ? a11yDark : a11yLight}
            wrapLongLines
          >
            {getHtmlDemoCode(url)}
          </SyntaxHighlighter>
        </CodeContainer>
      </Step>
    </Card>
  );
};

export default SetupGuide;
