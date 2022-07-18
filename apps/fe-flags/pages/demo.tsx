import { useEffect, useCallback, useState } from "react";
// Layout
import MainLayout from "../layouts/Main";
// Utils
import { isEmpty } from "@basestack/utils";
// Hooks
import { useDebounce } from "@basestack/hooks";
// Types
import { HistoryAction } from "types/history";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";

const ProjectsDemos = () => {
  const trpcContext = trpc.useContext();

  const projects = trpc.useQuery(["project.all"]);
  const createProject = trpc.useMutation(["project.create"], {
    onSuccess() {
      trpcContext.invalidateQueries(["project.all"]);
    },
  });

  const deleteProject = trpc.useMutation(["project.delete"], {
    onSuccess() {
      trpcContext.invalidateQueries(["project.all"]);
    },
  });

  const updateProject = trpc.useMutation(["project.update"], {
    onSuccess() {
      trpcContext.invalidateQueries(["project.all"]);
    },
  });

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
        createProject.mutate(values);

        resetForm();
      } catch (error) {
        console.log("Error on create project", error);
      }
    },
  });

  const update = useCallback(
    (projectId: string, projectName: string) => {
      let name = prompt("New project name:", projectName);

      if (!isEmpty(name)) {
        updateProject.mutate({
          projectId,
          name: name as string,
        });
      }
    },
    [updateProject]
  );

  const deleteAction = useCallback(
    (projectId: string) => {
      if (confirm("Delete project?")) {
        deleteProject.mutate({ projectId });
      }
    },
    [deleteProject]
  );

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
          {projects.data?.projects.map((item) => (
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

const UsersList = ({ projectId }: { projectId: string }) => {
  const { isLoading, data } = trpc.useQuery(
    ["user.byProjectId", { projectId }],
    { enabled: !isEmpty(projectId) }
  );

  return (
    <div>
      <h4>Users on Project list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data?.users.map((item) => {
            return (
              <li key={item.id}>
                name: <b>{item.name} </b>| email: <b>{item.email}</b> | image:{" "}
                <b>{item.image}</b>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const UsersDemos = () => {
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [searchUsers, setSearchUsers] = useState(null);

  const { refetch, isLoading, data } = trpc.useQuery(
    ["user.bySearch", { projectId, search: name }],
    { enabled: false }
  );

  useEffect(() => {
    if (!isLoading && data) {
      // @ts-ignore
      setSearchUsers(data);
    }
  }, [isLoading, data]);

  useDebounce(
    async () => {
      try {
        if (isEmpty(name)) return;

        refetch();
      } catch (error) {
        console.log("error getting users", error);
      }
    },
    200,
    [name]
  );

  return (
    <div>
      <div>
        <br />
        <h4>Load Users</h4>
        <input
          placeholder="projectId"
          type="text"
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
        />
      </div>

      <br />
      <UsersList projectId={projectId} />

      <div>
        <br />
        <h4>Search Users</h4>
        <input
          placeholder="user name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div>
        <h4>Users Search:</h4>
        {!searchUsers && (
          <ul>
            {
              // @ts-ignore
              searchUsers?.users.map((item) => {
                return (
                  <li key={item.id}>
                    name: <b>{item.name} </b>| email: <b>{item.email}</b> |
                    image: <b>{item.image}</b>
                  </li>
                );
              })
            }
          </ul>
        )}
      </div>
    </div>
  );
};

const HistoryList = ({ projectId }: { projectId: string }) => {
  const { isLoading, data } = trpc.useQuery(
    ["history.all", { projectId, flagId: undefined }],
    { enabled: !isEmpty(projectId) }
  );

  return (
    <div>
      <h4>History list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data?.history.map((item) => {
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
  const trpcContext = trpc.useContext();

  const createHistory = trpc.useMutation(["history.create"], {
    onSuccess() {
      trpcContext.invalidateQueries(["history.all"]);
    },
  });

  const onCreateHistory = useCallback(async () => {
    createHistory.mutate({
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
  const { isLoading, data } = trpc.useQuery(
    ["environment.all", { projectId }],
    { enabled: !isEmpty(projectId) }
  );

  return (
    <div>
      <h4>Environment list:</h4>
      {!isLoading && data && (
        <ul>
          {
            // @ts-ignore
            data?.environments?.map((item) => (
              <li key={item.id}>
                {item.name} (<b>{item.id}</b>) |{" "}
                <button onClick={() => update(item.id, item.name)}>✏️</button> |{" "}
                <button onClick={() => deleteAction(item.id)}>❌</button>
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};

const EnvironmentsDemos = () => {
  const trpcContext = trpc.useContext();
  const [projectId, setProjectId] = useState("");
  const { onCreateHistory } = useCreateApiHistory();

  const createEnvironment = trpc.useMutation(["environment.create"], {
    onSuccess(data) {
      trpcContext.invalidateQueries(["environment.all"]);

      onCreateHistory(HistoryAction.createEnvironment, {
        projectId: data.environment.projectId,
        payload: {
          environment: {
            id: data.environment.id,
            name: data.environment.name,
            slug: data.environment.slug,
            description: data.environment.description ?? "",
          },
        },
      });
    },
  });

  const updateEnvironment = trpc.useMutation(["environment.update"], {
    onSuccess() {
      trpcContext.invalidateQueries(["environment.all"]);
    },
  });

  const deleteEnvironment = trpc.useMutation(["environment.delete"], {
    onSuccess() {
      trpcContext.invalidateQueries(["environment.all"]);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createEnvironment.mutate({
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
        updateEnvironment.mutate({
          projectId,
          environmentId,
          name: name as string,
          description: "a update description",
        });
      }
    },
    [updateEnvironment, projectId]
  );

  const deleteAction = useCallback(
    (environmentId: string) => {
      if (confirm("Delete Environment?")) {
        deleteEnvironment.mutate({ environmentId, projectId });
      }
    },
    [deleteEnvironment, projectId]
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
  const { isLoading, data } = trpc.useQuery(
    ["flag.all", { projectId, environmentId: envId, pagination: null }],
    { enabled: !isEmpty(envId) || !isEmpty(projectId) }
  );

  return (
    <div>
      <h4>Flags list:</h4>
      {!isLoading && !isEmpty(data) && (
        <ul>
          {data?.flags.map((item) => (
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
  const trpcContext = trpc.useContext();
  const [envId, setEnvId] = useState("");
  const [projectId, setProjectId] = useState("");

  const createFlag = trpc.useMutation(["flag.create"], {
    onSuccess() {
      trpcContext.invalidateQueries(["flag.all"]);
    },
  });

  const updateFlag = trpc.useMutation(["flag.update"], {
    onSuccess() {
      trpcContext.invalidateQueries(["flag.all"]);
    },
  });

  const deleteFlag = trpc.useMutation(["flag.delete"], {
    onSuccess() {
      trpcContext.invalidateQueries(["flag.all"]);
    },
  });

  const formik = useFormik({
    initialValues: {
      slug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createFlag.mutate({
          projectId,
          environmentId: envId,
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
      updateFlag.mutate({
        projectId,
        enabled: false,
        flagId,
        description: "a update description",
        expiredAt: null,
        payload: undefined,
      });
    },
    [updateFlag, projectId]
  );

  const deleteAction = useCallback(
    (flagId: string) => {
      if (confirm("Delete Flag?")) {
        deleteFlag.mutate({ flagId, projectId });
      }
    },
    [deleteFlag, projectId]
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
      <h2>Users</h2>

      <UsersDemos />

      <br />
      <h2>History</h2>

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
