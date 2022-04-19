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
