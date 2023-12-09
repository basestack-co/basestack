import styled from "styled-components";
import { rem } from "polished";

export const Environments = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    border-radius: ${rem("4px")};
  }
`;
