import { FormikProps } from "formik";

export type SelectedView = "cards" | "table";

export interface InitialValues {
  name: string;
  description: string;
  environments: Array<{ id: string; name: string; enabled: boolean }>;
}

export type Form = FormikProps<InitialValues>;

export enum TabType {
  CORE = "core",
  ADVANCED = "advanced",
  HISTORY = "history",
}
