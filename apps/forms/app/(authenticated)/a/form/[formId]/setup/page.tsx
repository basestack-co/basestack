"use client";

import React, { Fragment, useEffect } from "react";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Components
import { Banners } from "@basestack/ui";
import EndpointCard from "./_components/EndpointCard";
import { HorizontalRule } from "@basestack/design-system";
import SetupGuide from "./_components/SetupGuide";
import Form from "./_components/Form";
import Links from "./_components/Links";
// Styles
import { useTheme } from "styled-components";
import { Column, Container, Row } from "./styles";

const SetupPage = () => {
  const t = useTranslations("form");
  const theme = useTheme();
  const { formId } = useParams<{ formId: string }>();

  const { data: form } = api.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  const isEnabled = form?.isEnabled ?? true;
  const hasRetention = form?.hasRetention ?? true;

  useEffect(() => {
    document.title = `${form?.name ?? "Form"} / ${t("seo.setup")}`;
  }, [form?.name, t]);

  return (
    <Fragment>
      <Banners
        data={[
          {
            title: t("submission.alert.enabled.description"),
            isVisible: !isEnabled,
          },
          {
            title: t("submission.alert.retention.description"),
            isVisible: !hasRetention && isEnabled,
          },
        ]}
      />
      <Container>
        <EndpointCard formId={formId ?? ""} />
        <HorizontalRule my={theme.spacing.s5} isDarker />
        <Row>
          <Column>
            <SetupGuide formId={formId ?? ""} />
          </Column>
          <Column>
            <Form
              formId={formId ?? ""}
              isFormDisabled={!form?.isEnabled || !form?.hasRetention}
            />
            <Links />
          </Column>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SetupPage;
