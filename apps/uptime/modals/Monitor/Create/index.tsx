// Types
import { MonitorType } from ".prisma/client";
import {
  InputGroup,
  Modal,
  Select,
  Switch,
  Tabs,
  Text,
} from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
import styled, { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";
// Store
import { useShallow } from "zustand/react/shallow";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
] as const;

const defaultRegions = [
  { value: "us-east-1", label: "US East" },
  { value: "eu-west-1", label: "EU West" },
  { value: "ap-south-1", label: "AP South" },
];

const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(MonitorType),
  cron: z.string().min(1, "Cron is required"),
  config: z.object({
    url: z.string().url("Must be a valid URL"),
    method: z.enum(methods),
    expectedStatus: z.number().min(100).max(599),
    timeout: z.number().min(100).max(300_000),
    verifySSL: z.boolean().optional(),
    followRedirects: z.boolean().optional(),
    body: z.string().optional(),
    keyword: z.string().optional(),
    port: z.number().min(1).max(65535).optional(),
    sslCheckDays: z.number().min(1).max(365).optional(),
    regions: z.array(z.string()).optional(),
    retries: z.number().min(0).max(10).optional(),
    retryDelay: z.number().min(0).max(10000).optional(),
    maxResponseSize: z
      .number()
      .min(1024)
      .max(10 * 1024 * 1024)
      .optional(),
    headers: z.string().optional(), // JSON string input, converted on submit
  }),
});

type FormInputs = z.infer<typeof FormSchema>;

const tabItems = [
  { text: "Core", id: "core" },
  { text: "Advanced", id: "advanced" },
] as const;

const CreateMonitorModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const trpcUtils = api.useUtils();

  const { projectId } = useParams<{ projectId: string }>();

  const [isModalOpen, setCreateMonitorModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateMonitorModalOpen,
        state.setCreateMonitorModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createMonitor = api.projectMonitors.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // watch,
    setValue,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: MonitorType.HTTP,
      cron: "*/1 * * * *",
      config: {
        url: "",
        method: "GET",
        expectedStatus: 200,
        timeout: 5000,
        verifySSL: true,
        followRedirects: true,
        retries: 0,
        retryDelay: 1000,
        maxResponseSize: 1024 * 1024,
        headers: "{}",
        regions: [],
      },
    },
  });

  const isSubmittingOrMutating = isSubmitting || createMonitor.isPending;

  const onClose = () => setCreateMonitorModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    try {
      const headersObj = input.config.headers
        ? (JSON.parse(input.config.headers) as Record<string, string>)
        : {};

      createMonitor.mutate(
        {
          projectId,
          name: input.name,
          type: input.type,
          cron: input.cron,
          config: {
            url: input.config.url,
            method: input.config.method,
            headers: headersObj,
            timeout: input.config.timeout,
            expectedStatus: input.config.expectedStatus,
            body: input.config.body,
            keyword: input.config.keyword,
            port: input.config.port,
            sslCheckDays: input.config.sslCheckDays,
            followRedirects: input.config.followRedirects,
            verifySSL: input.config.verifySSL,
            regions: input.config.regions,
            retries: input.config.retries,
            retryDelay: input.config.retryDelay,
            maxResponseSize: input.config.maxResponseSize,
          },
        },
        {
          onSuccess: async () => {
            await trpcUtils.projectMonitors.list.invalidate({ projectId });
            onClose();
            reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    } catch {
      toast.error("Headers must be a valid JSON object");
    }
  };

  // const selectedType = watch("type");

  return (
    <Portal selector="#portal">
      <Modal
        title={t("project.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("project.create.button.cancel"), onClick: onClose },
          {
            children: t("project.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isLoading: isSubmittingOrMutating,
            isDisabled: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Tabs
          items={[...tabItems]}
          onSelect={(tab) => setValue("config.keyword", tab)}
          mb={theme.spacing.s6}
        />

        <Text size="medium" mb={theme.spacing.s3} fontWeight={500}>
          Core
        </Text>

        <Grid>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Name"
                hint={errors.name?.message}
                inputProps={{
                  type: "text",
                  name: field.name,
                  value: field.value,
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: "E.g. Homepage",
                  hasError: !!errors.name,
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
                  Monitor Type
                </Text>
                <Select
                  options={Object.values(MonitorType).map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  value={{ value: field.value, label: field.value }}
                  onChange={(opt: any) => field.onChange(opt.value)}
                />
              </div>
            )}
          />

          <Controller
            name="cron"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Cron"
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
                }}
              />
            )}
          />

          <Controller
            name="config.url"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="URL"
                hint={errors.config?.url?.message}
                inputProps={{
                  type: "url",
                  name: field.name,
                  value: field.value,
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: "https://example.com",
                  hasError: !!errors.config?.url,
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
                  Method
                </Text>
                <Select
                  options={methods.map((m) => ({ value: m, label: m }))}
                  value={{ value: field.value, label: field.value }}
                  onChange={(opt: any) => field.onChange(opt.value)}
                />
              </div>
            )}
          />

          <Controller
            name="config.expectedStatus"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Expected Status"
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
                }}
              />
            )}
          />

          <Controller
            name="config.timeout"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Timeout (ms)"
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
                }}
              />
            )}
          />

          <Controller
            name="config.verifySSL"
            control={control}
            render={({ field }) => (
              <Switch
                text="Verify SSL"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                mt={theme.spacing.s5}
              />
            )}
          />

          <Controller
            name="config.followRedirects"
            control={control}
            render={({ field }) => (
              <Switch
                text="Follow Redirects"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                mt={theme.spacing.s5}
              />
            )}
          />
        </Grid>

        <Text
          size="medium"
          mt={theme.spacing.s6}
          mb={theme.spacing.s3}
          fontWeight={500}
        >
          Advanced
        </Text>

        <Grid>
          <Controller
            name="config.headers"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Headers (JSON)"
                hint={errors.config?.headers?.message}
                textarea
                textareaProps={{
                  name: field.name,
                  value: field.value ?? "{}",
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: '{"Authorization": "Bearer ..."}',
                  hasError: !!errors.config?.headers,
                }}
              />
            )}
          />

          <Controller
            name="config.body"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Body"
                textarea
                textareaProps={{
                  name: field.name,
                  value: field.value ?? "",
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: "Request body (optional)",
                }}
              />
            )}
          />

          <Controller
            name="config.keyword"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Keyword"
                inputProps={{
                  type: "text",
                  name: field.name,
                  value: field.value ?? "",
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: "Optional response keyword",
                }}
              />
            )}
          />

          <Controller
            name="config.port"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Port"
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
                }}
              />
            )}
          />

          <Controller
            name="config.sslCheckDays"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="SSL Check Days"
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
                  Regions
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
                />
              </div>
            )}
          />

          <Controller
            name="config.retries"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Retries"
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
                }}
              />
            )}
          />

          <Controller
            name="config.retryDelay"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Retry Delay (ms)"
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
                }}
              />
            )}
          />

          <Controller
            name="config.maxResponseSize"
            control={control}
            render={({ field }) => (
              <InputGroup
                title="Max Response Size (bytes)"
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
                }}
              />
            )}
          />
        </Grid>
      </Modal>
    </Portal>
  );
};

export default CreateMonitorModal;
