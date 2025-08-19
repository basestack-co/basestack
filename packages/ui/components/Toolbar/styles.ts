import styled from "styled-components";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["breakpoint"].includes(prop),
})<{ breakpoint: "xs" | "sm" | "md" | "lg" }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme, breakpoint }) => theme.device.max[breakpoint]} {
    flex-direction: column;
  }
`;

export const Column = styled.div.withConfig({
  shouldForwardProp: (prop) => !["flexShrink"].includes(prop),
})<{ flexShrink?: string | number }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s3};
  flex-shrink: ${({ flexShrink }) => flexShrink};
`;
