export enum TabType {
  MEMBERS = "Members",
  INVITES = "Invites",
}

export const tabPosition: { [key in TabType]: number } = {
  [TabType.MEMBERS]: 0,
  [TabType.INVITES]: 1,
};
