/*
 SETTINGS PAGE
 */

// GLOBAL

export const moreListMock = [
  { text: "Edit", onClick: () => console.log("") },
  { text: "History", onClick: () => console.log("") },
  { text: "Delete", onClick: () => console.log("") },
];

// API KEYS SETTINGS MODULE MOCKS

export const apiKeysTableMock = {
  headers: ["Key", "Environment", "Description"],
  rows: [
    {
      cols: [
        {
          title: "key_dev_8299aa6b",
        },
        {
          title: "development",
        },
        {
          title: "development SDK",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          title: "key_stag_3400aa6b",
        },
        {
          title: "staging",
        },
        {
          title: "staging SDK",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          title: "key_close_6002aa6b",
        },
        {
          title: "closeprod",
        },
        {
          title: "closeprod SDK",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          title: "key_prod_1092aa6b",
        },
        {
          title: "production",
        },
        {
          title: "production SDK",
        },
      ],
      more: moreListMock,
    },
  ],
};

// ENVIRONMENTS SETTINGS MODULE MOCKS

export const environmentsTableMock = {
  headers: ["Environment", "Description", "Show toggle"],
  rows: [
    {
      cols: [
        {
          title: "development",
        },
        {
          title: "Toggles for developers only",
        },
        {
          title: "yes",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          title: "staging",
        },
        {
          title: "Toggles for Qa’s",
        },
        {
          title: "no",
        },
      ],
      more: moreListMock,
    },

    {
      cols: [
        {
          title: "closeprod",
        },
        {
          title: "-",
        },
        {
          title: "no",
        },
      ],
      more: moreListMock,
    },

    {
      cols: [
        {
          title: "production",
        },
        {
          title: "Toggles for end users",
        },
        {
          title: "yes",
        },
      ],
      more: moreListMock,
    },
  ],
};

// MEMBERS SETTINGS MODULE MOCKS

export const membersTableMock = {
  headers: ["Name", "Email", "Role"],
  rows: [
    {
      cols: [
        {
          image: {
            userName: "Marta",
            src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Marta",
        },
        {
          title: "Marta@gmail.com",
        },
        {
          title: "Admin",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          image: {
            userName: "Pedro",
            src: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Pedro",
        },
        {
          title: "pedro_dev@gmail.com",
        },
        {
          title: "developer",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          image: {
            userName: "Daniel",
            src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Daniel",
        },
        {
          title: "daniel_ninja_dev@gmail.com",
        },
        {
          title: "developer",
        },
      ],
      more: moreListMock,
    },
    {
      cols: [
        {
          image: {
            userName: "Joana",
            src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Joana",
        },
        {
          title: "joana_mac@gmail.com",
        },
        {
          title: "QA",
        },
      ],
      more: moreListMock,
    },
  ],
};
