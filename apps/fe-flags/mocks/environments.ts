export const environmentsMock = [
  {
    id: "cl26g2quu0037liuekefwefe",
    name: "Env 1",
    slug: "env1",
    projectId: "cl26g2quu0037liuekedc8ir4",
    updatedAt: "2022-04-19T19:45:06.000Z",
    createdAt: "2022-04-19T19:45:04.000Z",
  },
  {
    id: "cl26g2quu0037liuekefwef23",
    name: "Env 2",
    slug: "env2",
    projectId: "cl26g2quu0037liuekedc8ir4",
    updatedAt: "2022-04-19T19:45:06.000Z",
    createdAt: "2022-04-19T19:45:04.000Z",
  },
];

export const environmentMock = {
  id: "cl26g2quu0037liuekefwefe",
  name: "Env 1",
  slug: "env1",
  projectId: "cl26g2quu0037liuekedc8ir4",
  updatedAt: "2022-04-19T19:45:06.000Z",
  createdAt: "2022-04-19T19:45:04.000Z",
};

export const allEnvironmentsResponseMock = {
  environments: environmentsMock,
};

export const getAllEnvironmentsArgsMock = {
  projectId: "cl1l86cxb00790zuey3az0e0d",
};

export const createEnvironmentArgsMock = {
  name: "muda",
  projectId: "cl26g2quu0037liuekedc8ir4",
  slug: "muda",
};

export const createEnvironmentResponseMock = {
  environment: environmentMock,
};

export const updateEnvironmentArgsMock = {
  name: "muda",
  projectId: "cl26g2quu0037liuekedc8ir4",
  environmentId: "cl26g2quu0037liuekedc8i22",
};

export const updateEnvironmentResponseMock = {
  name: "muda",
};

export const projectEnvironmentResponseMock = {
  id: "cl26g2quu0037liuekedc8ir4",
  name: "nice3",
  slug: "vaos",
  createdAt: "2022-04-19T17:53:29.718Z",
  updatedAt: "2022-04-19T17:53:33.249Z",
};

export const deleteEnvironmentArgsMock = {
  projectId: "cl26g2quu0037liuekedc8ir4",
  environmentId: "cl26g2quu0037liuekedc8i22",
};
