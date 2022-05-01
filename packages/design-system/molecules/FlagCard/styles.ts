import styled from "styled-components";
import { Label, Card } from "../../atoms";

export const StyledCard = styled(Card)`
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.elevation4};
  }
`;

export const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

export const StyledLabel = styled(Label)`
  margin-right: ${({ theme }) => theme.spacing.s1};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;
