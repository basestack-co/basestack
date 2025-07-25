// Locales
import { useTranslations } from "next-intl";
import { Fragment } from "react";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Theme
import { useTheme } from "styled-components";
// Components
import Step from "./Step";
// Styles
import { CodeContainer } from "./styles";
// Utils
import { getVueDemoCode, parseDescription } from "./utils";

export interface Props {
  endpoint: string;
}

SyntaxHighlighter.registerLanguage("javascript", js);

const VueStep = ({ endpoint }: Props) => {
  const theme = useTheme();
  const t = useTranslations("form");

  return (
    <Fragment>
      <Step
        step={1}
        title={t("setup.card.guide.vue.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.vue.step-1.description", {
            mode: "mode=rest",
          }),
        )}
      />
      <Step
        step={2}
        title={t("setup.card.guide.vue.step-2.title")}
        description={parseDescription(
          t("setup.card.guide.vue.step-2.description"),
        )}
      >
        <CodeContainer>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="javascript"
            style={theme.isDarkMode ? a11yDark : a11yLight}
            wrapLongLines
          >
            {getVueDemoCode(endpoint)}
          </SyntaxHighlighter>
        </CodeContainer>
      </Step>
    </Fragment>
  );
};

export default VueStep;
