import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FlagsCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const FlagsTableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s2};
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.s6};
`;

export const FlagsListContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;
