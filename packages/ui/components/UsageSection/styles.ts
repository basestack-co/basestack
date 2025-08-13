import Link from "next/link";
import { rem } from "polished";
import styled from "styled-components";
import { type SpaceProps, space } from "styled-system";

export const Section = styled.section.withConfig({
  shouldForwardProp: (prop) => !["mb"].includes(prop),
})<SpaceProps>`
  display: flex;
  flex-direction: column;
  ${space};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
  min-height: ${rem("36px")};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.s1};
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minMax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, minMax(0, 1fr));
  }

  @media screen and (max-width: 374px) {
    grid-template-columns: 1fr;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
