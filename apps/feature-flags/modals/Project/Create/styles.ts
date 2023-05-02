import styled, { css } from "styled-components";
import { rem } from "polished";

export const SlugContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const IconButtonContainer = styled.div`
  display: inline-flex;
  position: absolute;
  right: ${rem("6px")};
  bottom: ${rem("6px")};
`;
