import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.nav<{ isDarkMode: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background: ${({ isDarkMode }) =>
    isDarkMode ? "rgba(31, 31, 31, 0.6)" : "rgba(238, 238, 238, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  height: ${rem("80px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  transition: all 0.2s ease-in;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  margin-right: ${({ theme }) => theme.spacing.s2};
`;

export const RightColumn = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Logo = styled.div`
  display: inline-flex;
  justify-content: center;
  position: relative;
  height: ${rem("40px")};
  width: ${rem("40px")};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black};

  &::before {
    content: "";
    position: absolute;
    bottom: ${rem("5px")};
    border-radius: 50%;
    height: ${rem("20px")};
    width: ${rem("20px")};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
