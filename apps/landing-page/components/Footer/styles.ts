import styled, { css } from "styled-components";
import Link from "next/link";
import { rem } from "polished";

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray200};
    ${({ theme }) =>
      theme.isDarkMode
        ? css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray900} 0%,
              ${theme.colors.gray700} 25%,
              ${theme.colors.gray700} 50%,
              ${theme.colors.gray700} 75%,
              ${theme.colors.gray900} 100%
            );
          `
        : css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray50} 0%,
              ${theme.colors.gray200} 25%,
              ${theme.colors.gray200} 50%,
              ${theme.colors.gray200} 75%,
              ${theme.colors.gray50} 100%
            );
          `};
  }
`;

export const ContentWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const MainContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s8};
  padding: ${({ theme }) => theme.spacing.s8} 0;

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.s8};
  justify-content: space-between;
  max-width: ${rem("800px")};

  @media screen and ${({ theme }) => theme.device.min.md} {
    margin-left: auto;
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.s7};
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.s4};
  gap: ${({ theme }) => theme.spacing.s8};
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s2};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.color};
  line-height: 1.4;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

export const InputContainer = styled.div`
  display: flex;
`;
