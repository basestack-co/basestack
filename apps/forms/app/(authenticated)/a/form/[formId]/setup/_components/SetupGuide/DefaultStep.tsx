// Utils
import { truncateString } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { Fragment } from "react";
// Components
import Step from "./Step";
// Styles
import { CodeContainer } from "./styles";
import { parseDescription } from "./utils";

export interface Props {
  endpoint: string;
  children?: React.ReactNode;
}

const DefaultStep = ({ endpoint, children }: Props) => {
  const t = useTranslations("form");

  return (
    <Fragment>
      <Step
        step={1}
        title={t("setup.card.guide.html.step-1.title")}
        description={parseDescription(
          t("setup.card.guide.html.step-1.description", {
            url: truncateString(endpoint, 50),
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
        <CodeContainer>{children}</CodeContainer>
      </Step>
    </Fragment>
  );
};

export default DefaultStep;
