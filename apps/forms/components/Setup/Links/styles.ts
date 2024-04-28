import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.s2};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const Link = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:after {
    transition: width 0.2s ease-in-out;
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.text.color};
    width: 0;
  }

  p {
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    p {
      color: ${({ theme }) => theme.text.color};
    }

    &:after {
      width: 100%;
    }
  }
`;
