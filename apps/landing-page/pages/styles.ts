import styled from "styled-components";

export const DarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray800};
`;
