export const flagsMock = [
  {
    createdAt: "2022-04-22T16:59:44.335Z",
    environmentId: "cl2aoghvp01596juek134uhfs",
    enabled: true,
    expiredAt: "2022-04-22T17:59:38.000Z",
    id: "cl2aoghvp01596juek134u222",
    payload: {},
    slug: "niceflag",
    updatedAt: "2022-04-22T17:59:40.000Z",
    description: "nice",
  },
  {
    createdAt: "2022-04-22T16:59:44.335Z",
    environmentId: "cl2aoghvp01596juek134uhfs",
    expiredAt: "2022-04-22T17:59:38.000Z",
    id: "cl2aoghvp01596juek134u3554",
    enabled: false,
    payload: {},
    slug: "niceflag2",
    updatedAt: "2022-04-22T17:59:40.000Z",
    description: "nice",
  },
];

export const flagMock = {
  createdAt: "2022-04-22T16:59:44.335Z",
  environmentId: "cl2aoghvp01596juek134uhfs",
  expiredAt: "2022-04-22T17:59:38.000Z",
  id: "cl2aoghvp01596juek134u222",
  enabled: true,
  payload: {},
  slug: "niceflag",
  updatedAt: "2022-04-22T17:59:40.000Z",
};

export const allFlagsResponseMock = {
  flags: flagsMock,
  pagination: {
    skip: 0,
    take: 10,
    total: 2,
  },
};

export const getFlagsArgsMock = {
  projectId: "cl2aoghvp01596juek134fsdf",
  envId: "cl2aoghvp01596juek134uhfs",
  pagination: {
    skip: "0",
    take: "10",
  },
};

export const allFlagsByProjectAndEnvResponseMock = [
  {
    flags: flagsMock,
    _count: {
      flags: 2,
    },
  },
];

export const createFlagArgsMock = {
  description: "a default description",
  enabled: true,
  envId: "cl2aoghvp01596juek134uhfs",
  expiredAt: null,
  payload: "{}",
  projectId: "cl2aogaew00926juehs2ecs2t",
  slug: "new_flag",
};

export const createFlagResponseMock = {
  id: "cl2f3l972234244ue3a3o5utj",
  slug: "new_flag",
  description: "a default description",
  enabled: true,
  payload: "{}",
  expiredAt: null,
  createdAt: "2022-04-25T19:13:53.870Z",
  updatedAt: "2022-04-25T19:13:53.870Z",
  environmentId: "cl2aoghvp01596juek134uhfs",
};

export const validUserInProjectResponseMock = {
  id: "cl2aogaew00926juehs2ecs2t",
  name: "novo",
  slug: "novo",
  createdAt: "2022-04-22T16:59:03.224Z",
  updatedAt: "2022-04-22T16:59:03.224Z",
};

export const createFlagsResponseMock = {
  flag: flagMock,
};

export const getFlagByIdResponseMock = {
  id: "cl2aoghvp01596juek13sdfdsf",
  slug: "botala",
  description: "nice",
  enabled: true,
  payload: {},
  expiredAt: "2022-04-22T17:59:38.000Z",
  createdAt: "2022-04-25T19:36:14.000Z",
  updatedAt: "2022-04-25T19:36:15.000Z",
  environmentId: "cl2aoghvp01596juek134uhfs",
  environment: {
    id: "cl2aoghvp01596juek134uhfs",
    name: "envnov2",
    description: "a update description",
    slug: "envnov",
    createdAt: "2022-04-22T16:59:12.901Z",
    updatedAt: "2022-04-22T17:04:25.454Z",
    projectId: "cl2aogaew00926juehs2ecs2t",
  },
};

export const getFlagByIdArgsMock = {
  projectId: "cl2aoghvp01596juek134fsdf",
  envId: "cl2aoghvp01596juek134uhfs",
  flagId: "cl2aoghvp01596juek13sdfdsf",
};

export const updateFlagByIdArgsMock = {
  description: "a update description",
  enabled: false,
  envId: "cl2aoghvp01596juek134uhfs",
  flagId: "cl2aoghvp01596juek13sdfdsf",
  projectId: "cl2aogaew00926juehs2ecs2t",
};

export const updateFlagByIdResponseMock = {
  createdAt: "2022-04-25T19:36:14.000Z",
  description: "a update description",
  enabled: false,
  environmentId: "cl2aoghvp01596juek134uhfs",
  expiredAt: "2022-04-25T19:36:12.000Z",
  id: "cl2aoghvp01596juek13sdfdsf",
  payload: {},
  slug: "botala",
  updatedAt: "2022-04-25T21:04:34.626Z",
};

export const deleteFlagByIdResponseMock = {
  createdAt: "2022-04-25T19:36:14.000Z",
  description: "a update description",
  enabled: false,
  environmentId: "cl2aoghvp01596juek134uhfs",
  expiredAt: "2022-04-25T19:36:12.000Z",
  id: "cl2aoghvp01596juek13sdfdsf",
  payload: {},
  slug: "botala",
  updatedAt: "2022-04-25T21:04:34.626Z",
};

export const deleteFlagByIdArgsMock = {
  envId: "cl2aoghvp01596juek134uhfs",
  flagId: "cl2aoghvp01596juek13sdfdsf",
  projectId: "cl2aogaew00926juehs2ecs2t",
};

export const getAllFlagsByProjectArgsMock = {
  projectId: "cl2aoghvp01596juek134fsdf",
  pagination: {
    skip: "0",
    take: "10",
  },
};

export const getAllFlagsByProjectResponseMock = {
  flags: [
    {
      slug: "design",
      flags: [
        {
          id: "cl35vbz8f2294qnw3ksbgr1pm",
          slug: "design",
          description: "a default description",
          enabled: true,
          payload: "{}",
          expiredAt: null,
          createdAt: "2022-05-14T12:52:30.879Z",
          updatedAt: "2022-05-14T12:52:30.880Z",
          environment: {
            id: "cl35tw5q70430qnw3m86wo56d",
            name: "env2",
            description: "a default description",
            slug: "env2",
            createdAt: "2022-05-14T12:12:13.183Z",
            updatedAt: "2022-05-14T12:12:13.184Z",
            projectId: "cl2vs2opt0073osw3kd7q26yd",
          },
        },
        {
          id: "cl35vbude2203qnw30fkfn4tm",
          slug: "design",
          description: "a default description",
          enabled: false,
          payload: "{}",
          expiredAt: null,
          createdAt: "2022-05-14T12:52:24.578Z",
          updatedAt: "2022-05-14T12:52:24.579Z",
          environment: {
            id: "cl35tw0mu0362qnw36qkn607b",
            name: "env1",
            description: "a default description",
            slug: "env1",
            createdAt: "2022-05-14T12:12:06.582Z",
            updatedAt: "2022-05-14T12:12:06.583Z",
            projectId: "cl2vs2opt0073osw3kd7q26yd",
          },
        },
      ],
      environments: [
        {
          id: "cl35tw5q70430qnw3m86wo56d",
          name: "env2",
          enabled: true,
        },
        {
          id: "cl35tw0mu0362qnw36qkn607b",
          name: "env1",
          enabled: false,
        },
      ],
    },
  ],
  pagination: {
    skip: 0,
    take: 10,
    total: 6,
  },
};
