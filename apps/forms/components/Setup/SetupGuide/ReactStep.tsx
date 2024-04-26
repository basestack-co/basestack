import React, { Fragment } from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Theme
import { useTheme } from "styled-components";
// Components
import Step from "./Step";
// Styles
import { CodeContainer } from "./styles";
// Utils
import { parseDescription, getHtmlDemoCode } from "./utils";

export interface Props {
  endpoint: string;
}

const ReactStep = ({ endpoint }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("forms");

  return (
    <Fragment>
      <Step
        step={1}
        title={t("setup.card.guide.html.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.html.step-1.description", {
            url: endpoint,
            method: "POST",
          }),
        )}
      />
      <Step
        step={2}
        title={t("setup.card.guide.html.step-2.title")}
        description={parseDescription(
          t("setup.card.guide.html.step-2.description"),
        )}
      />
      <Step
        step={3}
        title={t("setup.card.guide.html.step-3.title")}
        description={parseDescription(
          t("setup.card.guide.html.step-3.description"),
        )}
      >
        <CodeContainer>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="html"
            style={theme.isDarkMode ? a11yDark : a11yLight}
            wrapLongLines
          >
            {getHtmlDemoCode(endpoint)}
          </SyntaxHighlighter>
        </CodeContainer>
      </Step>
    </Fragment>
  );
};

export default ReactStep;
