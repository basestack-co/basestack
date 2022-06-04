import { Button } from "design-system";

export const button = {
  render: Button,
  description: "An example of a component that uses the Button fron DS",
  children: ["text"],
  attributes: {
    variant: {
      type: String,
      default: "primary",
      description: "Change button variant",
      matches: ["primary", "secondary", "tertiary"],
    },
  },
};
