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
import {
  useCreateEnvironmentMutation,
  useUpdateEnvironmentByIdMutation,
  useDeleteEnvironmentByIdMutation,
  useGetEnvironmentsQuery,
} from "store/query/environments";
import {
  flagsApi,
  useGetFlagsQuery,
  useCreateFlagMutation,
  useUpdateFlagByIdMutation,
  useDeleteFlagByIdMutation,
} from "store/query/flags";
import {
  useGetHistoryQuery,
  useCreateHistoryMutation,
} from "store/query/history";
// Utils
import isEmpty from "lodash.isempty";
// Types
import { Project } from "types/query/projects";
import { Environment } from "types/query/environments";
import { Flag } from "types/query/flags";
import { History, HistoryAction } from "types/query/history";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const ProjectsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [deleteProject] = useDeleteProjectByIdMutation();

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

const HistoryList = ({ projectId }: { projectId: string }) => {
  const { isLoading, data } = useGetHistoryQuery(
    {
      projectId,
      /*  query: {
        flagId: "cl2npxpyp0874d4ueo42d0kxx",
      }, */
    },
    {
      skip: isEmpty(projectId),
    }
  );

  return (
    <div>
      <h4>History list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data.history.map((item: History) => {
            return (
              <li key={item.id}>
                action: <b>{item.action} </b>| projectId:{" "}
                <b>{item.projectId}</b> | payload:{" "}
                <b>{JSON.stringify(item.payload)}</b>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const HistoryDemos = () => {
  const [projectId, setProjectId] = useState("");
  const [createHistory] = useCreateHistoryMutation();

  const onCreateHistory = useCallback(async () => {
    createHistory({
      projectId,
      action: HistoryAction.createFlag,
      payload: {
        flag: {
          id: "cl2npxsbm0920d4ue44r5ujt9",
          slug: "test",
          enabled: true,
        },
        user: {
          id: "cl2npwq7i0662d4ueifse5ms3",
          name: "John Doe",
          avatar: "https://avatars3.githubusercontent.com/u/17098?v=4",
        },
      },
    });
  }, [projectId, createHistory]);

  return (
    <div>
      <div>
        <br />
        <h4>Load History</h4>
        <input
          placeholder="projectId"
          type="text"
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
        />

        <button onClick={onCreateHistory}>Create History</button>
      </div>

      <br />
      <HistoryList projectId={projectId} />
    </div>
  );
};

const EnvironmentsList = ({
  projectId,
  update,
  deleteAction,
}: {
  update: (environmentId: string, envName: string) => void;
  deleteAction: (environmentId: string) => void;
  projectId: string;
}) => {
  const { isLoading, data } = useGetEnvironmentsQuery(
    {
      projectId,
    },
    {
      skip: isEmpty(projectId),
      // refetchOnMountOrArgChange: true
    }
  );

  return (
    <div>
      <h4>Environment list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data.environments.map((item: Environment) => (
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
  const [projectId, setProjectId] = useState("");
  const [createEnvironment] = useCreateEnvironmentMutation();
  const [updateEnvironment] = useUpdateEnvironmentByIdMutation();
  const [deleteEnvironment] = useDeleteEnvironmentByIdMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createEnvironment({
          ...values,
          projectId,
          description: "a default description",
        });

        resetForm();
      } catch (error) {
        console.log("Error on create project", error);
      }
    },
  });

  const update = useCallback(
    (environmentId: string, envName: string) => {
      let name = prompt("New environment name:", envName);

      if (!isEmpty(name)) {
        updateEnvironment({
          environmentId,
          projectId,
          name,
          description: "a update description",
        });
      }
    },
    [projectId, updateEnvironment]
  );

  const deleteAction = useCallback(
    (environmentId: string) => {
      if (confirm("Delete Environment?")) {
        deleteEnvironment({ projectId, environmentId });
      }
    },
    [projectId, deleteEnvironment]
  );

  return (
    <div>
      <div>
        <br />
        <h4>Load Environment</h4>
        <input
          placeholder="projectId"
          type="text"
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
        />

        <br />
        <br />

        <div>
          <h4>New Environment</h4>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
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

            <label htmlFor="slug">Slug</label>
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
      </div>

      <br />
      <EnvironmentsList
        projectId={projectId}
        update={update}
        deleteAction={deleteAction}
      />
    </div>
  );
};

const FlagsList = ({
  projectId,
  envId,
  update,
  deleteAction,
}: {
  update: (flagId: string) => void;
  deleteAction: (flagId: string) => void;
  projectId: string;
  envId: string;
}) => {
  const { isLoading, data } = useGetFlagsQuery(
    {
      projectId,
      envId,
      pagination: {
        skip: "0",
        take: "10",
      },
    },
    {
      skip: isEmpty(envId) || isEmpty(projectId),
      // refetchOnMountOrArgChange: true
    }
  );

  return (
    <div>
      <h4>Flags list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data.flags.map((item: Flag) => (
            <li key={item.id}>
              (slug: <b>{item.slug}</b>) (id: <b>{item.id}</b>) (Enabled:{" "}
              <b>{item.enabled ? "ON" : "OFF"}</b>) |{" "}
              <button onClick={() => update(item.id)}>✏️</button> |{" "}
              <button onClick={() => deleteAction(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FlagsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [envId, setEnvId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [createFlag] = useCreateFlagMutation();
  const [updateFlag] = useUpdateFlagByIdMutation();
  const [deleteFlag] = useDeleteFlagByIdMutation();

  useEffect(() => {
    const getAllFlagsByProject = async () => {
      try {
        const { status, data } = await dispatch(
          flagsApi.endpoints.getAllFlagsByProject.initiate({
            projectId,
          })
        );

        if (status === "fulfilled") {
          console.log("all flags by project = ", data);
        }
      } catch (error) {
        console.log("error getting project", error);
      }
    };

    if (!isEmpty(projectId)) {
      console.log("entrou aqui");
      getAllFlagsByProject();
    }
  }, [projectId]);

  const formik = useFormik({
    initialValues: {
      slug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createFlag({
          projectId,
          envId,
          slug: values.slug,
          enabled: true,
          payload: JSON.stringify({}),
          expiredAt: null,
          description: "a default description",
        });
        resetForm();
      } catch (error) {
        console.log("Error on create project", error);
      }
    },
  });

  const update = useCallback(
    (flagId: string) => {
      updateFlag({
        enabled: false,
        flagId,
        envId,
        projectId,
        description: "a update description",
      });
    },
    [projectId, updateFlag, envId]
  );

  const deleteAction = useCallback(
    (flagId: string) => {
      console.log("del flagId = ", flagId);
      if (confirm("Delete Flag?")) {
        deleteFlag({ projectId, envId, flagId });
      }
    },
    [projectId, envId, deleteFlag]
  );

  return (
    <div>
      <div>
        <br />
        <h4>Load Flags</h4>
        <input
          placeholder="projectId"
          type="text"
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
        />

        <input
          placeholder="envId"
          type="text"
          onChange={(e) => setEnvId(e.target.value)}
          value={envId}
        />

        <br />
        <br />

        <div>
          <h4>New Flag</h4>
          <form onSubmit={formik.handleSubmit}>
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
      </div>

      <br />
      <FlagsList
        envId={envId}
        projectId={projectId}
        update={update}
        deleteAction={deleteAction}
      />
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
      <h2>Projects</h2>

      <HistoryDemos />

      <br />
      <h2>Environments</h2>

      <EnvironmentsDemos />

      <br />
      <h2>Flags</h2>

      <FlagsDemos />
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default DemoPage;
