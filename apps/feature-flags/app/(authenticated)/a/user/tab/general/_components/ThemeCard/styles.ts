import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PopupWrapper = styled.div`
  height: 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
