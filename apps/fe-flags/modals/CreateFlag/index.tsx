import React, { useCallback, useState, useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import {
  Tabs,
  Modal,
  InputGroup,
  Text,
  Switch,
} from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { seIstCreateFlagModalOpen } from "contexts/modals/actions";
// Form
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
// Types
import { HistoryAction } from "types/history";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Styles
import { Environments } from "./styles";

interface InitialValues {
  name: string;
  description: string;
  environments: Array<{ id: string; name: string; enabled: boolean }>;
}

const CreateFlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;
  const {
    dispatch,
    state: { isCreateFlagModalOpen: isModalOpen },
  } = useModals();
  const { onCreateHistory } = useCreateApiHistory();
  const [textareaLength, setTextareaLength] = useState("");
  const [selectedTab, setSelectedTab] = useState("core");

  const { data, isLoading } = trpc.useQuery([
    "environment.all",
    { projectSlug },
  ]);

  const createFlag = trpc.useMutation(["flag.create"], {
    async onSuccess(data) {
      console.log("success data = ", data);

      onCreateHistory(HistoryAction.createFlag, {
        projectId: "cl73mzxsf0947wu68vmsd448f",
        payload: {
          flag: {
            id: "",
            slug: "",
            enabled: false,
          },
        },
      });

      await trpcContext.invalidateQueries(["flag.byProjectSlug"]);
    },
  });

  const onClose = useCallback(() => {
    dispatch(seIstCreateFlagModalOpen(false));
    formik.resetForm();
  }, [dispatch]);

  const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      name: "",
      description: "",
      environments: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      description: Yup.string().max(150, "Must be 120 characters or less"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = values.environments.map((env) => ({
        slug: values.name,
        description: values.description,
        environmentId: env.id,
        enabled: env.enabled,
        payload: JSON.stringify({}),
        expiredAt: null,
      }));

      createFlag.mutate({ projectId: "cl73mzxsf0947wu68vmsd448f", data });
      onClose();
    },
  });

  useEffect(() => {
    if (!isLoading && data && data.environments && isModalOpen) {
      const environments = data.environments.map(({ id, name }) => ({
        id,
        name,
        enabled: false,
      }));
      formik.setFieldValue("environments", environments);
    }
    // It wants formik but adding create an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isModalOpen]);

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 120) {
        setTextareaLength(text);
      }

      formik.setFieldValue("description", text);
    },
    [textareaLength]
  );

  const onChangeEnvironmentSwitch = useCallback(
    (id: string, enabled: boolean) => {
      console.log("id = ", id);
      console.log("enabled = ", enabled);
      const updated = formik.values.environments.map((item) =>
        item.id === id ? { ...item, enabled } : item
      );

      console.log("updated = ", updated);

      formik.setFieldValue("environments", updated);
    },
    [formik.values.environments]
  );

  const onRenderCore = useCallback(() => {
    return (
      <>
        <InputGroup
          title="Feature Key"
          hint={
            formik.errors.name || "No numbers, spaces, or special characters"
          }
          inputProps={{
            name: "name",
            value: formik.values.name.replace(/ /g, "_"),
            onChange: formik.handleChange,
            placeholder: "E.g. header_size",
            hasError: formik.touched.name && !!formik.errors.name,
            isDisabled: formik.isSubmitting,
          }}
          mb={theme.spacing.s6}
        />
        <InputGroup
          title="Description"
          label={`${textareaLength.length} / 120`}
          textarea
          textareaProps={{
            name: "description",
            value: formik.values.description,
            onChange: onChangeTextarea,
            placeholder: "Flag description",
            maxlength: "120",
            hasError: formik.touched.description && !!formik.errors.description,
            isDisabled: formik.isSubmitting,
          }}
          mb={theme.spacing.s6}
        />
        <Text
          fontWeight={500}
          mb={theme.spacing.s2}
          data-testid="input-group-title"
          size="small"
        >
          Environments
        </Text>
        <Environments>
          {formik.values.environments.map(({ id, name, enabled }) => {
            return (
              <Switch
                key={`create-flag-env-${id}`}
                py={theme.spacing.s2}
                mr={theme.spacing.s5}
                text={name}
                checked={enabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeEnvironmentSwitch(id, event.target.checked)
                }
              />
            );
          })}
        </Environments>
      </>
    );
  }, [formik]);

  const onRenderAdvanced = useCallback(() => {
    return (
      <>
        <InputGroup
          title="Expiration Date"
          inputProps={{
            onChange: (text) => console.log("text = ", text),
            placeholder: "mm/dd/yyyy",
            name: "date",
            value: "",
          }}
          mb={theme.spacing.s6}
        />
        <Text fontWeight={500} size="small">
          Payload
        </Text>
      </>
    );
  }, []);

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Create", onClick: formik.handleSubmit },
        ]}
      >
        <Tabs
          items={[{ text: "Core" }, { text: "Advanced" }]}
          onSelect={(tab) => setSelectedTab(tab.toLowerCase())}
          sliderPosition={selectedTab === "advanced" ? 1 : 0}
          mb={theme.spacing.s6}
        />
        {selectedTab === "core" ? onRenderCore() : onRenderAdvanced()}
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
