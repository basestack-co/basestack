// React
import { useMemo } from "react";
// Types
import { MonitorType } from ".prisma/client";
// Components
import { InputGroup, Select, Text } from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormWatch,
} from "react-hook-form";
import { useTheme } from "styled-components";
// Styles
import { Grid } from "../styles";
import type { MonitorFormInputs } from "../types";
// Utils
import { defaultIntervalChecks, methods } from "../utils";
import { estimateCronCost } from "utils/helpers/estimates";

export interface Props {
  errors: FieldErrors<MonitorFormInputs>;
  control: Control<MonitorFormInputs>;
  isSubmitting: boolean;
  watch: UseFormWatch<MonitorFormInputs>;
}

const MonitorCoreTab = ({ errors, control, isSubmitting, watch }: Props) => {
  const t = useTranslations();
  const theme = useTheme();

  const cron = watch("interval");

  const cost = useMemo(() => {
    const interval = typeof cron === "string" ? cron : cron.value;

    if (!interval) return "";

    const result = estimateCronCost(interval, new Date(), 0.00007);

    if (result === 0) return "";

    return result.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [cron]);

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
                .filter((v) =>
                  [MonitorType.HTTP, MonitorType.PING].includes(v as any)
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
        name="interval"
        control={control}
        render={({ field }) => {
          return (
            <div>
              <Text size="small" mb={theme.spacing.s2} fontWeight={500}>
                {t("modal.monitor.form.input.cron.title")}
              </Text>
              <Select
                options={defaultIntervalChecks}
                value={field.value}
                onChange={(opt: any) => field.onChange(opt)}
                isDisabled={isSubmitting}
              />
              {cost && (
                <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                  Estimated monthly cost: {cost}.
                </p>
              )}
            </div>
          );
        }}
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

      {/* 
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
      */}
    </Grid>
  );
};

export default MonitorCoreTab;
