export const projectsMock = [
  {
    id: "cl1l86cxb00790zuey3az0e0d",
    name: "another",
    slug: "",
    createdAt: "2022-04-04T21:29:11.663Z",
    updatedAt: "2022-04-04T21:29:03.958Z",
  },
  {
    id: "1234",
    name: "Nice project",
    slug: "test_prok",
    createdAt: "2022-04-04T21:27:49.091Z",
    updatedAt: "2022-04-04T21:27:04.746Z",
  },
];

export const createProjectArgsMock = {
  name: "Nice new project",
  slug: "slis8383kjd83",
};

export const projectMock = {
  id: "cl24vhr5y050191wocdzfps09",
  name: "isto",
  slug: "isto",
  createdAt: "2022-04-18T15:29:31.846Z",
  updatedAt: "2022-04-18T15:29:31.846Z",
};

export const projectsOnUsersMock = {
  projectId: "cl24vhr5y050191wocdzfps09",
  userId: "cl1l75ceh0444mcue7u7edzrn",
};

export const createProjectResponseMock = {
  project: projectMock,
  connection: projectsOnUsersMock,
};
