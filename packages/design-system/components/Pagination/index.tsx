import { memo } from "react";
import { useTheme } from "styled-components";
import type { SpaceProps } from "styled-system";
import { Button, ButtonVariant } from "../Button";
import { Container, NumberContainer, StyledText } from "./styles";

export interface PaginationProps extends SpaceProps {
  /**
   * onClick load more
   */
  onClick: () => void;
  /**
   * current page
   */
  currentPage: number;
  /**
   * number of pages
   */
  totalPages: number;
  /**
   * show loading spinner
   */
  isLoading: boolean;
}

const Pagination = ({
  onClick,
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  ...props
}: PaginationProps) => {
  const theme = useTheme();

  return (
    <Container data-testid="pagination" {...props}>
      <StyledText
        data-testid="pagination-left-text"
        size="small"
        muted
        mr={theme.spacing.s1}
      >
        Showing
      </StyledText>
      <NumberContainer>
        <StyledText data-testid="pagination-current-page" size="small">
          {currentPage}
        </StyledText>
      </NumberContainer>
      <StyledText
        data-testid="pagination-total-pages"
        ml={theme.spacing.s1}
        size="small"
        muted
      >
        of {""}
        {totalPages}
      </StyledText>
      <Button
        onClick={onClick}
        variant={ButtonVariant.Neutral}
        ml={theme.spacing.s1}
        isLoading={isLoading}
        isDisabled={currentPage >= totalPages}
      >
        Load More
      </Button>
    </Container>
  );
};

export default memo(Pagination);
