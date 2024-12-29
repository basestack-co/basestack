import React, { Fragment } from "react";
// Locales
import { useTranslations } from "next-intl";
// Components
import Step from "./Step";
// Styles
import { CodeContainer } from "./styles";
// Utils
import { parseDescription } from "./utils";

export interface Props {
  children?: React.ReactNode;
}

const RestStep = ({ children }: Props) => {
  const  t  = useTranslations("form");

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
        <CodeContainer>{children}</CodeContainer>
      </Step>
    </Fragment>
  );
};

export default RestStep;
