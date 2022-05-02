export const historyByFlagIdResponseMock = [
  {
    id: "cl2npxsbm0920d4ue44rfds",
    userId: "cl2npwq7i0662d4ueifse5ms3",
    projectId: "cl2npx6a00734d4ue4j3qtlcu",
    action: "DELETE_FLAG",
    payload: {
      flag: {
        id: "cl2npxpyp0874d4ueo42d0kxx",
        slug: "flag",
        enabled: true,
      },
      environment: {
        id: "cl2npxhry0806d4uehs83pkqy",
        name: "env",
      },
      user: {
        id: "cl2npwq7i0662d4ueifse5ms3",
        name: "Vitor Amaral",
        avatar: "https://avatars.githubusercontent.com/u/3766024?v=4",
      },
    },
    createdAt: "2022-05-01T21:03:48.000Z",
    updatedAt: "2022-05-01T21:03:49.000Z",
  },
];

export const historyByProjectIdResponseMock = [
  {
    id: "cl2npxsbm0920d4ue44sdfs",
    userId: "cl2npxsbm0920d4ue44rfds",
    projectId: "cl2npx6a00734d4ue4j3qtlcu",
    action: "UPDATE_ENV",
    payload: {},
    createdAt: "2022-05-01T21:05:18.000Z",
    updatedAt: "2022-05-01T21:05:19.000Z",
  },
  {
    id: "cl2npxsbm0920d4ue44rfds",
    userId: "cl2npwq7i0662d4ueifse5ms3",
    projectId: "cl2npx6a00734d4ue4j3qtlcu",
    action: "DELETE_FLAG",
    payload: {
      flag: {
        id: "cl2npxpyp0874d4ueo42d0kxx",
        slug: "flag",
        enabled: true,
      },
      environment: {
        id: "cl2npxhry0806d4uehs83pkqy",
        name: "env",
      },
      user: {
        id: "cl2npwq7i0662d4ueifse5ms3",
        name: "Vitor Amaral",
        avatar: "https://avatars.githubusercontent.com/u/3766024?v=4",
      },
    },
    createdAt: "2022-05-01T21:03:48.000Z",
    updatedAt: "2022-05-01T21:03:49.000Z",
  },
  {
    id: "cl2npwq7i0662d4ueifsesfdas",
    userId: "cl2npwq7i0662d4ueifse5ms3",
    projectId: "cl2npx6a00734d4ue4j3qtlcu",
    action: "UPDATE_FLAG",
    payload: {},
    createdAt: "2022-05-01T21:03:18.000Z",
    updatedAt: "2022-05-01T21:03:22.000Z",
  },
];

export const historyByProjectIdArgsMock = {
  projectId: "cl2npx6a00734d4ue4j3qtlcu",
};

export const createHistoryByProjectIdResponseMock = {
  id: "cl2npxsbm0920d4ue44rfds",
  userId: "cl2npwq7i0662d4ueifse5ms3",
  projectId: "cl2npx6a00734d4ue4j3qtlcu",
  action: "DELETE_FLAG",
  payload: {},
  createdAt: "2022-05-01T21:03:48.000Z",
  updatedAt: "2022-05-01T21:03:49.000Z",
};

export const createHistoryArgsMock = {
  projectId: "cl2npx6a00734d4ue4j3qtlcu",
  action: "CREATE_FLAG",
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
};
