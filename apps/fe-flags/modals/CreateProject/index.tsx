import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Form
import { useFormik } from "formik";
import * as Yup from "yup";
// Types
import { HistoryAction } from "types/history";
// Theme
import { useTheme } from "styled-components";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { seIsCreateProjectModalOpen } from "contexts/modals/actions";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Utils
import { generateSlug } from "random-word-slugs";
import { slugify } from "@basestack/utils";
// Hooks
import { useDebounce } from "@basestack/hooks";

const CreateProjectModal = () => {
  const theme = useTheme();
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();

  const {
    dispatch,
    state: { isCreateProjectModalOpen: isModalOpen },
  } = useModals();

  const createProject = trpc.useMutation(["project.create"], {
    async onSuccess(data) {
      onCreateHistory(HistoryAction.createProject, {
        projectId: data.project.id,
        payload: {
          project: {
            name: data.project.name,
            slug: data.project.slug,
          },
        },
      });

      await trpcContext.invalidateQueries(["project.all"]);
    },
  });

  const onClose = useCallback(() => {
    dispatch(seIsCreateProjectModalOpen(false));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      slug: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createProject.mutate({
        name: values.name,
        slug: values.slug,
      });

      await router.push({
        pathname: "/[projectSlug]/flags",
        query: { projectSlug: values.slug },
      });

      onClose();
      resetForm();
    },
  });

  useDebounce(
    () => {
      const value = formik.values.name;
      if (value) {
        formik.setFieldValue("slug", value);
      }
    },
    500,
    [formik.values.name]
  );

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Project"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          { children: "Create", onClick: formik.handleSubmit },
        ]}
      >
        <InputGroup
          title="Project name"
          hint={formik.errors.name}
          inputProps={{
            name: "name",
            value: formik.values.name,
            onChange: formik.handleChange,
            placeholder: "E.g. Chat",
            hasError: formik.touched.name && !!formik.errors.name,
            isDisabled: formik.isSubmitting,
          }}
          mb={theme.spacing.s6}
        />

        <InputGroup
          title="Project slug"
          hint={formik.errors.slug}
          inputProps={{
            name: "slug",
            value: slugify(formik.values.slug),
            onChange: formik.handleChange,
            placeholder: "pr-chat",
            hasError: formik.touched.slug && !!formik.errors.slug,
            isDisabled: formik.isSubmitting,
          }}
        />
        <button
          onClick={() => {
            formik.setFieldValue("slug", generateSlug());
          }}
        >
          generate
        </button>
      </Modal>
    </Portal>
  );
};

export default CreateProjectModal;
