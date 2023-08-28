import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${({ theme }) => theme.spacing.s4};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s5};
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s2};
  background-color: ${({ theme }) => theme.colors.gray100};
`;
