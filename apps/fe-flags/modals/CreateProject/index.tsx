import React, { useCallback } from "react";
// Form
import { useFormik } from "formik";
import * as Yup from "yup";
// Types
import { HistoryAction } from "types/history";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { seIsCreateProjectModalOpen } from "contexts/modals/actions";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";

const CreateProjectModal = () => {
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();

  const createProject = trpc.useMutation(["project.create"], {
    onSuccess(data) {
      onCreateHistory(HistoryAction.createProject, {
        projectId: data.project.id,
        payload: {
          project: {
            name: data.project.name,
            slug: data.project.slug,
          },
        },
      });

      trpcContext.invalidateQueries(["project.all"]);
      dispatch(seIsCreateProjectModalOpen(false));
    },
  });

  const {
    dispatch,
    state: { isCreateProjectModalOpen: isModalOpen },
  } = useModals();

  const onClose = useCallback(() => {
    dispatch(seIsCreateProjectModalOpen(false));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createProject.mutate({
        name: values.name,
        slug: values.name,
      });
      resetForm();
    },
  });

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Project"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Create", onClick: formik.handleSubmit },
        ]}
      >
        <InputGroup
          title="Project Name"
          hint={formik.errors.name}
          inputProps={{
            name: "name",
            value: formik.values.name,
            onChange: formik.handleChange,
            placeholder: "E.g. Chat",
            hasError: !!formik.touched.name && !!formik.errors.name,
            isDisabled: formik.isSubmitting,
          }}
        />
      </Modal>
    </Portal>
  );
};

export default CreateProjectModal;
