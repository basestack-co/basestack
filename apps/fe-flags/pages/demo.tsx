import { useEffect, useCallback, useState } from "react";
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
  useDeleteProjectByIdMutation,
} from "store/query/projects";
import { environmentsApi } from "store/query/environments";
// Utils
import isEmpty from "lodash.isempty";
// Types
import { Project } from "types/query/projects";
import { Environment } from "types/query/environments";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const ProjectsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [deleteProject] = useDeleteProjectByIdMutation();

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
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(JSON.stringify(values));
        const payload = await createProject(values);
        console.log("payload", payload);
        resetForm();
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

  const deleteAction = useCallback((projectId: string) => {
    if (confirm("Delete project?")) {
      deleteProject({ projectId });
    }
  }, []);

  return (
    <div>
      <div>
        <br />
        <h4>New Project</h4>
        <form onSubmit={formik.handleSubmit}>
          <label>Name</label>
          <input
            placeholder="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}

          <label>Slug</label>
          <input
            placeholder="slug"
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
              {item.name} (<b>{item.id}</b>) |{" "}
              <button onClick={() => update(item.id, item.name)}>✏️</button> |{" "}
              <button onClick={() => deleteAction(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EnvironmentsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [envId, setEnvId] = useState("");
  const [environments, setEnvironments] = useState([]);
  /* const environments = useGetEnvironmentsQuery({
    projectId: "cl26g2quu0037liuekedc8ir4",
  }); */
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [deleteProject] = useDeleteProjectByIdMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = await createProject(values);

        resetForm();
      } catch (error) {
        console.log("Error on create project", error);
      }
    },
  });

  const load = useCallback(async (projectId: string) => {
    try {
      setEnvironments([]);
      const { status, data } = await dispatch(
        environmentsApi.endpoints.getEnvironments.initiate({
          projectId,
        })
      );

      if (status === "fulfilled") {
        setEnvironments(data.environments);
      }
    } catch (error) {
      console.log("error getting environments", error);
    }
  }, []);

  const update = useCallback((projectId: string, projectName: string) => {
    let name = prompt("New project name:", projectName);

    if (!isEmpty(name)) {
      updateProject({
        projectId,
        name,
      });
    }
  }, []);

  const deleteAction = useCallback((projectId: string) => {
    if (confirm("Delete Environment?")) {
      deleteProject({ projectId });
    }
  }, []);

  return (
    <div>
      <div>
        <br />
        <h4>Load Environment</h4>
        <input
          placeholder="projectId"
          type="text"
          onChange={(e) => setEnvId(e.target.value)}
          value={envId}
        />

        <button onClick={() => load(envId)}>Load Envs</button>

        <br />
        <br />

        <h4>New Environment</h4>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
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
      <h4>Environment list:</h4>
      {!isEmpty(environments) && (
        <ul>
          {environments.map((item: Environment) => (
            <li key={item.id}>
              {item.name} |{" "}
              <button onClick={() => update(item.id, item.name)}>✏️</button> |{" "}
              <button onClick={() => deleteAction(item.id)}>❌</button>
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

      <br />
      <h2>Environments</h2>

      <EnvironmentsDemos />
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default DemoPage;
