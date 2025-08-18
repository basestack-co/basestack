// Form

// Types
import { MonitorType } from ".prisma/client";
// Components
import { InputGroup, Select, Switch, Text } from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { useTheme } from "styled-components";
// Styles
import { Grid } from "../styles";
import type { MonitorFormInputs } from "../types";
// Utils
import { methods } from "../utils";

export interface Props {
  errors: FieldErrors<MonitorFormInputs>;
  control: Control<MonitorFormInputs>;
  isSubmitting: boolean;
}

const MonitorCoreTab = ({ errors, control, isSubmitting }: Props) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Grid>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.name.title")}
            hint={errors.name?.message}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "E.g. Homepage",
              hasError: !!errors.name,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div>
            <Text size="small" mb={theme.spacing.s2} fontWeight={500}>
              {t("modal.monitor.form.input.type.title")}
            </Text>
            <Select
              options={Object.values(MonitorType)
                .filter(
                  (v) =>
                    ![
                      MonitorType.CRON_JOB,
                      MonitorType.HTTPS,
                      MonitorType.API_ENDPOINT,
                    ].includes(v as any)
                )
                .map((v) => ({
                  value: v,
                  label: t(
                    `modal.monitor.form.input.type.option.${v.toLowerCase()}` as any
                  ),
                }))}
              value={{ value: field.value, label: field.value }}
              onChange={(opt: any) => field.onChange(opt.value)}
              isDisabled={isSubmitting}
            />
          </div>
        )}
      />

      <Controller
        name="cron"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.cron.title")}
            label="Use standard cron syntax (UTC)"
            hint={errors.cron?.message}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "*/1 * * * *",
              hasError: !!errors.cron,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.url"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.url.title")}
            hint={errors.config?.url?.message}
            inputProps={{
              type: "url",
              name: field.name,
              value: field.value,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "https://example.com",
              hasError: !!errors.config?.url,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.method"
        control={control}
        render={({ field }) => (
          <div>
            <Text size="small" mb={theme.spacing.s2} fontWeight={500}>
              {t("modal.monitor.form.input.method.title")}
            </Text>
            <Select
              options={methods.map((m) => ({ value: m, label: m }))}
              value={{ value: field.value, label: field.value }}
              onChange={(opt: any) => field.onChange(opt.value)}
              isDisabled={isSubmitting}
            />
          </div>
        )}
      />

      <Controller
        name="config.expectedStatus"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.expected-status.title")}
            hint={errors.config?.expectedStatus?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value,
              onChange: (e) =>
                field.onChange(parseInt(e.target.value || "0", 10)),
              onBlur: field.onBlur,
              placeholder: "e.g. 200",
              hasError: !!errors.config?.expectedStatus,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.timeout"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.timeout.title")}
            hint={errors.config?.timeout?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value,
              onChange: (e) =>
                field.onChange(parseInt(e.target.value || "0", 10)),
              onBlur: field.onBlur,
              placeholder: "e.g. 5000",
              hasError: !!errors.config?.timeout,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.verifySSL"
        control={control}
        render={({ field }) => (
          <Switch
            text={t("modal.monitor.form.input.verify-ssl.title")}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            mt={theme.spacing.s5}
            isDisabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="config.followRedirects"
        control={control}
        render={({ field }) => (
          <Switch
            text={t("modal.monitor.form.input.follow-redirects.title")}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            mt={theme.spacing.s5}
            isDisabled={isSubmitting}
          />
        )}
      />
    </Grid>
  );
};

export default MonitorCoreTab;
