import styled from "styled-components";
import { space, position, compose } from "styled-system";
import { Label, Card } from "../../atoms";

export const StyledCard = styled(Card)`
  ${compose(space, position)};
  position: relative;
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

export const PopupWrapper = styled.div`
  height: 0;
`;
