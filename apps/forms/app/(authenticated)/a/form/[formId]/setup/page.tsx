"use client";

import { HorizontalRule } from "@basestack/design-system";
// Components
import { Banners } from "@basestack/ui";
// Utils
import { config } from "@basestack/utils";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// React
import { Fragment, useEffect, useMemo } from "react";
// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import EndpointCard from "./_components/EndpointCard";
import Form from "./_components/Form";
import Links from "./_components/Links";
import SetupGuide from "./_components/SetupGuide";
import { Column, Container, Row } from "./styles";

const { hasPermission, PERMISSIONS } = config;

const SetupPage = () => {
  const t = useTranslations("form");
  const theme = useTheme();
  const { formId } = useParams<{ formId: string }>();
  const router = useRouter();

  const { data: form } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  const isEnabled = form?.isEnabled ?? true;
  const hasRetention = form?.hasRetention ?? true;

  const permissions = useMemo(
    () => ({
      canView: hasPermission(form?.role, PERMISSIONS.FORM.SETUP.VIEW),
    }),
    [form?.role],
  );

  useEffect(() => {
    document.title = `${form?.name ?? "Form"} / ${t("seo.setup")}`;
  }, [form?.name, t]);

  useEffect(() => {
    if (!permissions.canView) {
      router.push(`/a/form/${formId}/submissions`);
    }
  }, [formId, router, permissions.canView]);

  if (!permissions.canView) {
    return null;
  }

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
