import styled from "styled-components";
import {
  SpaceProps,
  space,
  flexbox,
  FlexboxProps,
  compose,
} from "styled-system";

export const ContentContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.s5};
  }
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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s3};
  padding: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    button {
      width: 100%;
      text-align: center;
      justify-content: center;
    }
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    height: 28px;
    left: 0;
    width: 2px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray100"]};
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    display: none;
  }
`;
