import styled from "styled-components";
import { rem } from "polished";

export const Environments = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ReactJsonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray50};

  .react-json-view {
    font-size: ${rem("14px")};
    border-radius: ${rem("4px")};
    padding: ${({ theme }) => theme.spacing.s4};
  }
`;
