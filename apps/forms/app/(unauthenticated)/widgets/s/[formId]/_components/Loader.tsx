"use client";
// Hono
import { client } from "utils/hono/client";
// Types
import type { InferResponseType } from "hono/client";
// Styles
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const $getById = client.api.v1.s[":formId"].$get;

export interface CardsProps {
  data: InferResponseType<typeof $getById, 200>;
  layout: string;
  theme: string;
}

const Loader = ({ data, layout, theme }: CardsProps) => {
  console.log("the data", data.submissions);
  console.log("the layout", layout);
  console.log("the theme", theme);

  return (
    <Container>
      <ul>
        {data.submissions.map((submission) => (
          <li key={submission.id}>{JSON.stringify(submission.data)}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Loader;
