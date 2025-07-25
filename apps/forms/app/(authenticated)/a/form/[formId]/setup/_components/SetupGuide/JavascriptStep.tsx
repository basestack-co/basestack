// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { Fragment } from "react";
// Components
import Step from "./Step";
// Styles
import { CodeContainer } from "./styles";
// Utils
import { parseDescription } from "./utils";

export interface Props {
  children?: React.ReactNode;
}

const JavascriptStep = ({ children }: Props) => {
  const t = useTranslations("form");

  return (
    <Fragment>
      <Step
        step={1}
        title={t("setup.card.guide.javascript.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.javascript.step-1.description", {
            mode: "mode=rest",
          }),
        )}
      />
      <Step
        step={2}
        title={t("setup.card.guide.javascript.step-2.title")}
        description={parseDescription(
          t("setup.card.guide.javascript.step-2.description"),
        )}
      >
        <CodeContainer>{children}</CodeContainer>
      </Step>
    </Fragment>
  );
};

export default JavascriptStep;
