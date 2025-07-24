import { rem } from "polished";
import styled, { css } from "styled-components";
import { compose, layout, space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "maxWidth",
})`
  height: ${rem("44px")};
  display: flex;
  background-color: ${({ theme }) => theme.copyCard.backgroundColor};
  border-radius: 4px;
  overflow: hidden;
  ${compose(layout, space)};
`;

const containerSharedStyles = css`
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div`
  ${containerSharedStyles};
  background-color: ${({ theme }) => theme.copyCard.title.backgroundColor};
  padding: 0 ${({ theme }) => theme.spacing.s4};
  flex-shrink: 0;
`;

export const DescriptionContainer = styled.div`
  ${containerSharedStyles};
  padding: 0 ${({ theme }) => theme.spacing.s4};
  overflow: hidden;
`;

export const IconButtonContainer = styled.div`
  ${containerSharedStyles};
  padding-right: ${({ theme }) => theme.spacing.s2};
  margin-left: auto;
`;
