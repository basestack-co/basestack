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
};

export const getFlagsArgsMock = {
  projectId: "cl2aoghvp01596juek134fsdf",
  envId: "cl2aoghvp01596juek134uhfs",
  pagination: {
    skip: "0",
    take: "10",
  },
};
