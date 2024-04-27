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
import { parseDescription, getRestDemoCode } from "./utils";

export interface Props {
  endpoint: string;
}

const RestStep = ({ endpoint }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("forms");

  return (
    <Fragment>
      <Step
        step={1}
        title={t("setup.card.guide.rest.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.rest.step-1.description", {
            mode: "mode=rest",
          }),
        )}
      />
      <Step
        step={2}
        title={t("setup.card.guide.rest.step-2.title")}
        description={parseDescription(
          t("setup.card.guide.rest.step-2.description"),
        )}
      >
        <CodeContainer>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="curl"
            style={theme.isDarkMode ? a11yDark : a11yLight}
            wrapLongLines
          >
            {getRestDemoCode(endpoint)}
          </SyntaxHighlighter>
        </CodeContainer>
      </Step>
    </Fragment>
  );
};

export default RestStep;
