import React, { Fragment } from "react";
import Head from "next/head";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Layout
import MainLayout from "layouts/Main";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Banners } from "@basestack/ui";
import EndpointCard from "components/Setup/EndpointCard";
import { HorizontalRule } from "@basestack/design-system";
import SetupGuide from "components/Setup/SetupGuide";
import Form from "components/Setup/Form";
import Links from "components/Setup/Links";
// Styles
import { useTheme } from "styled-components";
import { Column, Container, Row } from "components/Setup/styles";

const SetupPage = () => {
  const { t } = useTranslation("forms");
  const theme = useTheme();
  const router = useRouter();
  const { formId } = router.query as { formId: string };

  const { data: form } = trpc.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  const isEnabled = form?.isEnabled ?? true;
  const hasRetention = form?.hasRetention ?? true;

  return (
    <Fragment>
      <Head>
        <title>
          {form?.name ?? "Form"} / {t("seo.setup")}
        </title>
      </Head>
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

SetupPage.Layout = MainLayout;

export default SetupPage;
