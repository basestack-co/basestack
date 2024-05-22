import styled from "styled-components";
import {
  SpaceProps,
  space,
  flexbox,
  FlexboxProps,
  compose,
} from "styled-system";

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const Column = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  ${space};
`;

interface RowProps extends FlexboxProps, SpaceProps {}

export const Row = styled.div<RowProps>`
  display: flex;
  ${compose(flexbox, space)};
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.s3};
  padding: ${({ theme }) => theme.spacing.s5};
`;
