import React, { useEffect } from "react";
// Tab
import { useFormik, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
// Types
import { InitialValues } from "types/flags";
// Server
import { trpc } from "libs/trpc";

export interface Props {
  onSubmit: (
    values: InitialValues,
    formikHelpers: FormikHelpers<InitialValues>
  ) => void | Promise<any>;
  projectSlug: string;
  isModalOpen: boolean;
}

const useFlagForm = ({ onSubmit, projectSlug, isModalOpen }: Props) => {
  const { data: current } = trpc.useQuery(["project.bySlug", { projectSlug }], {
    enabled: !!projectSlug && isModalOpen,
  });

  const { data, isLoading } = trpc.useQuery(
    ["environment.all", { projectSlug }],
    { enabled: !!projectSlug && isModalOpen }
  );

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
    onSubmit,
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

  return { formik, current } as const;
};

export default useFlagForm;
