import styled from "styled-components";
import { rem } from "polished";
import Link from "next/link";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.color};
  line-height: ${rem("22px")};
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;
