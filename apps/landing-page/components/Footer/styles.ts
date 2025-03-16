import styled from "styled-components";
import Link from "next/link";
import { rem } from "polished";
import { gradientBorderStyles } from "../styles";

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  position: relative;
  ${gradientBorderStyles("top")};
`;

export const ContentWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const NewsletterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s8} 0;
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const NewsletterContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;

  @media screen and ${({ theme }) => theme.device.max.md} {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, auto));
  width: 100%;
  grid-gap: ${({ theme }) => theme.spacing.s8};
  padding: ${({ theme }) => theme.spacing.s8} 0;
  justify-content: space-between;

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${rem("25px")};
  gap: ${({ theme }) => theme.spacing.s8};
`;

export const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
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

export const LogoContainer = styled.div`
  display: inline-flex;
  flex-shrink: 0;
`;
