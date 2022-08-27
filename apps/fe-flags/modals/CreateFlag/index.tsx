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
import { useFormik } from "formik";
import * as Yup from "yup";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Styles
import { Environments } from "./styles";

const CreateFlagModal = () => {
  const theme = useTheme();
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;
  const {
    dispatch,
    state: { isCreateFlagModalOpen: isModalOpen },
  } = useModals();
  const [textareaLength, setTextareaLength] = useState("");
  const [selectedTab, setSelectedTab] = useState("core");

  const { data, isLoading } = trpc.useQuery([
    "environment.all",
    { projectSlug },
  ]);

  const onClose = useCallback(() => {
    dispatch(seIstCreateFlagModalOpen(false));
  }, [dispatch]);

  const formik = useFormik({
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
    onSubmit: async (values, { resetForm }) => {
      console.log("form values = ", values);
      // resetForm();
    },
  });

  useEffect(() => {
    if (!isLoading && data && data.environments) {
      console.log("data environments = ", data.environments);
      formik.setFieldValue("environments", [{ id: 1 }]);
    }
  }, [data, isLoading]);

  const onChangeTextarea = useCallback(
    (event) => {
      if (textareaLength.length < 120) {
        setTextareaLength(event.target.value.toString());
      }
    },
    [textareaLength]
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
            onChange: formik.handleChange,
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
          Enabled Environments
        </Text>
        <Environments>
          {formik.values.environments.map((item, index) => {
            return (
              <Switch
                key={`${index}`}
                py={theme.spacing.s2}
                mr={theme.spacing.s5}
                text="Development:"
                checked
                onChange={() => console.log("")}
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
