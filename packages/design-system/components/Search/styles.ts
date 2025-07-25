import { rem } from "polished";
import styled from "styled-components";
import { compose, layout, space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasFilter",
})<{ hasFilter: boolean }>`
  ${compose(space, layout)};
  background-color: ${({ theme }) => theme.search.backgroundColor};
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  input {
    border-radius: ${({ hasFilter }) => (hasFilter ? "4px 0 0 4px" : "4px")};
    padding-right: ${({ hasFilter }) =>
      hasFilter ? rem("32px") : rem("44px")};

    &:focus {
      outline-offset: -2px;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  position: relative;

  &:after {
    content: "";
    z-index: 2;
    position: absolute;
    height: 20px;
    right: -2px;
    width: 2px;
    background-color: ${({ theme }) => theme.search.border};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing.s3};
  padding-right: ${({ theme }) => theme.spacing.s1};
  max-width: ${rem("140px")};
  width: 100%;

  button > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
