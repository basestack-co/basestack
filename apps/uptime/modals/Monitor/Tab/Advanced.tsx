// Components
import { InputGroup, Select, Text } from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { useTheme } from "styled-components";
// Styles
import { Grid } from "../styles";
// Types
import type { MonitorFormInputs } from "../types";
// Utils
import { defaultRegions } from "../utils";

export interface Props {
  errors: FieldErrors<MonitorFormInputs>;
  control: Control<MonitorFormInputs>;
  isSubmitting: boolean;
}

const MonitorAdvancedTab = ({ errors, control, isSubmitting }: Props) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Grid>
      <Controller
        name="config.headers"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.headers.title")}
            hint={errors.config?.headers?.message}
            textarea
            textareaProps={{
              name: field.name,
              value: field.value ?? "{}",
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: '{"Authorization": "Bearer ..."}',
              hasError: !!errors.config?.headers,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.body"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.body.title")}
            textarea
            textareaProps={{
              name: field.name,
              value: field.value ?? "",
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "Request body (optional)",
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.keyword"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.keyword.title")}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value ?? "",
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "Optional response keyword",
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.port"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.port.title")}
            hint={errors.config?.port?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value ?? "",
              onChange: (e) =>
                field.onChange(
                  e.target.value === ""
                    ? undefined
                    : parseInt(e.target.value, 10),
                ),
              onBlur: field.onBlur,
              placeholder: "Optional",
              hasError: !!errors.config?.port,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.sslCheckDays"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.ssl-check-days.title")}
            hint={errors.config?.sslCheckDays?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value ?? "",
              onChange: (e) =>
                field.onChange(
                  e.target.value === ""
                    ? undefined
                    : parseInt(e.target.value, 10),
                ),
              onBlur: field.onBlur,
              placeholder: "Optional",
              hasError: !!errors.config?.sslCheckDays,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.regions"
        control={control}
        render={({ field }) => (
          <div>
            <Text size="small" mb={theme.spacing.s2} fontWeight={500}>
              {t("modal.monitor.form.input.regions.title")}
            </Text>
            <Select
              isMulti
              options={defaultRegions}
              value={
                (field.value || [])
                  .map((v) => defaultRegions.find((o) => o.value === v))
                  .filter(Boolean) as any
              }
              onChange={(opts: any) =>
                field.onChange((opts || []).map((o: any) => o.value))
              }
              isDisabled={isSubmitting}
            />
          </div>
        )}
      />

      <Controller
        name="config.retries"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.retries.title")}
            hint={errors.config?.retries?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value ?? 0,
              onChange: (e) =>
                field.onChange(parseInt(e.target.value || "0", 10)),
              onBlur: field.onBlur,
              placeholder: "0",
              hasError: !!errors.config?.retries,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.retryDelay"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.retry-delay.title")}
            hint={errors.config?.retryDelay?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value ?? 1000,
              onChange: (e) =>
                field.onChange(parseInt(e.target.value || "0", 10)),
              onBlur: field.onBlur,
              placeholder: "1000",
              hasError: !!errors.config?.retryDelay,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />

      <Controller
        name="config.maxResponseSize"
        control={control}
        render={({ field }) => (
          <InputGroup
            title={t("modal.monitor.form.input.max-response-size.title")}
            hint={errors.config?.maxResponseSize?.message}
            inputProps={{
              type: "number",
              name: field.name,
              value: field.value ?? 1024 * 1024,
              onChange: (e) =>
                field.onChange(parseInt(e.target.value || "0", 10)),
              onBlur: field.onBlur,
              placeholder: String(1024 * 1024),
              hasError: !!errors.config?.maxResponseSize,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />
    </Grid>
  );
};

export default MonitorAdvancedTab;
