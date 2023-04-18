import styled from "styled-components";
import { position, space, SpaceProps } from "styled-system";
import { rem } from "polished";

export const List = styled.ul<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div<SpaceProps>`
  ${space};
`;

export const ListItem = styled.li<SpaceProps>`
  ${space};
`;

export const AvatarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  ${position};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  padding: ${({ theme }) => theme.spacing.s1};
  border-radius: 4px;
  width: ${rem("280px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s1};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing.s3};
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ThemeContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${rem("32px")};
  margin: ${({ theme }) => theme.spacing.s3} 0;
`;

export const HrContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.s3};
  margin: ${({ theme }) => theme.spacing.s3} 0;
`;
