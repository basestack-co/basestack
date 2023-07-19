import { memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Button, ButtonVariant } from "../Button";
import { Container, Number, StyledText } from "./styles";

export interface PaginationProps extends SpaceProps {
  /**
   * onChange prev callback
   */
  onPrev: () => void;
  /**
   * onChange prev callback
   */
  onNext: () => void;
  /**
   * current page
   */
  currentPage: number;
  /**
   * number of pages
   */
  totalPages: number;
}

const Pagination = ({
  onPrev,
  onNext,
  currentPage = 1,
  totalPages = 1,
  ...props
}: PaginationProps) => {
  const theme = useTheme();

  return (
    <Container data-testid="pagination" {...props}>
      <Button
        iconPlacement="left"
        icon="chevron_left"
        variant={ButtonVariant.Neutral}
        mr={theme.spacing.s3}
      >
        Prev
      </Button>
      <Number>
        <StyledText data-testid="pagination-current-page" size="small">
          {currentPage}
        </StyledText>
      </Number>
      <StyledText
        data-testid="pagination-total-pages"
        ml={theme.spacing.s3}
        size="small"
      >
        of {""}
        {totalPages}
      </StyledText>
      <Button
        iconPlacement="right"
        icon="chevron_right"
        variant={ButtonVariant.Neutral}
        ml={theme.spacing.s3}
      >
        Next
      </Button>
    </Container>
  );
};

export default memo(Pagination);
