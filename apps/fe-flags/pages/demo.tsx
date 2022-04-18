import { useEffect, useCallback } from "react";
// Layout
import MainLayout from "../layouts/Main";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
// Queries
import {
  projectsApi,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from "store/query/projects";
// Utils
import isEmpty from "lodash.isempty";
// Types
import { Project } from "types/query/projects";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const ProjectsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectByIdMutation();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { status, data } = await dispatch(
          projectsApi.endpoints.getProjectById.initiate({
            projectId: "cl1l86cxb00790zuey3az0e0d",
          })
        );

        if (status === "fulfilled") {
          console.log("project by id = ", data.project);
        }
      } catch (error) {
        console.log("error getting project", error);
      }
    };
    getProject();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      slug: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(JSON.stringify(values));
        const payload = await createProject(values);
        console.log("payload", payload);
      } catch (error) {
        console.log("Error on create project", error);
      }
    },
  });

  const update = useCallback((projectId: string, projectName: string) => {
    let name = prompt("New project name:", projectName);

    if (!isEmpty(name)) {
      updateProject({
        projectId,
        name,
      });
    }
  }, []);

  return (
    <div>
      <div>
        <h4>New Project</h4>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}

          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            name="slug"
            type="slug"
            onChange={formik.handleChange}
            value={formik.values.slug}
          />

          {formik.touched.slug && formik.errors.slug ? (
            <div>{formik.errors.slug}</div>
          ) : null}

          <button type="submit">Submit</button>
        </form>
      </div>

      <br />
      <h4>Projects list:</h4>
      {!projects.isLoading && !isEmpty(projects.data) && (
        <ul>
          {projects.data.projects.map((item: Project) => (
            <li key={item.id}>
              {item.name} |{" "}
              <button onClick={() => update(item.id, item.name)}>✏️</button> |{" "}
              <button onClick={() => update(item.id, item.name)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DemoPage = () => {
  return (
    <div>
      <br />
      <h2>Projects</h2>

      <ProjectsDemos />
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default DemoPage;
