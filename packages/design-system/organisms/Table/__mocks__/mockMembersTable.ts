export const mockMore = [
  { text: "Edit", onClick: () => console.log("") },
  { text: "History", onClick: () => console.log("") },
  { text: "Delete", onClick: () => console.log("") },
];

export const mockMembersTable = {
  headers: ["Name", "Email", "Role"],
  rows: [
    {
      cols: [
        {
          image: {
            userName: "Jack",
            src: "",
          },
          title: "Jack",
        },
        {
          title: "jack@gmail.com",
        },
        {
          title: "Admin",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Pedro",
            src: "",
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
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Daniel",
            src: "",
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
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Joana",
            src: "",
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
      more: mockMore,
    },
  ],
};
