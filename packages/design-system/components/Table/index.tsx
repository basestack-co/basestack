import React from "react";
import { useTheme } from "styled-components";
import Avatar from "../Avatar";
import PopupMenu from "../PopupMenu";
import Text from "../Text";
import CopyClipboard from "./CopyClipboard";
import {
  Col,
  Container,
  ContentRow,
  MobileLabel,
  StyledLink,
  StyledRow,
} from "./styles";
import TextVisibility from "./TextVisibility";
import type {
  RowProps,
  TableColProps,
  TableProps,
  TableRowProps,
} from "./types";

const Row = ({
  headers = [],
  cols = [],
  more,
  numberOfCols = 3,
  tooltip,
  isResponsive,
  breakpoint,
}: RowProps) => {
  const theme = useTheme();

  return (
    <StyledRow
      numberOfColumns={numberOfCols}
      hasSmallCol={!!tooltip || more.length > 0}
      isResponsive={isResponsive}
      breakpoint={breakpoint}
      data-testid="row"
    >
      {cols &&
        cols.map((col, index) => {
          const imageSrc = col.image?.src ?? "";
          const imageUsername = col.image?.userName ?? "";

          if (col.children) {
            return (
              <Col
                key={`${index.toString()}-col`}
                isResponsive={isResponsive}
                breakpoint={breakpoint}
              >
                {isResponsive && (
                  <MobileLabel
                    muted
                    size="xSmall"
                    mb={theme.spacing.s1}
                    breakpoint={breakpoint}
                  >
                    {headers[index].toUpperCase()}
                  </MobileLabel>
                )}
                {col.children}
              </Col>
            );
          }

          return (
            <Col
              key={`${index.toString()}-col`}
              isResponsive={isResponsive}
              breakpoint={breakpoint}
            >
              {isResponsive && (
                <MobileLabel
                  muted
                  size="xSmall"
                  mb={theme.spacing.s1}
                  breakpoint={breakpoint}
                >
                  {headers[index].toUpperCase()}
                </MobileLabel>
              )}
              {col.link ? (
                <StyledLink>
                  <Text
                    color={theme.colors.primary}
                    fontWeight="400"
                    size="small"
                  >
                    {col.title}
                  </Text>
                </StyledLink>
              ) : (
                <ContentRow>
                  {(!!imageSrc || !!imageUsername) && (
                    <Avatar
                      src={imageSrc}
                      userName={imageUsername}
                      alt={`${imageUsername} profile image`}
                      size="small"
                      mr={theme.spacing.s3}
                    />
                  )}
                  {col.hideText ? (
                    <TextVisibility title={col.title} />
                  ) : (
                    <Text fontWeight="400" size="small">
                      {col.title}
                    </Text>
                  )}
                </ContentRow>
              )}
            </Col>
          );
        })}
      {!tooltip && more.length > 0 && (
        <Col isSmallCol isResponsive={isResponsive} breakpoint={breakpoint}>
          <PopupMenu items={more} />
        </Col>
      )}
      {tooltip && (
        <Col isSmallCol isResponsive={isResponsive} breakpoint={breakpoint}>
          <CopyClipboard tooltip={tooltip} />
        </Col>
      )}
    </StyledRow>
  );
};

const Table = ({
  isResponsive = true,
  breakpoint = "md",
  data,
  ...props
}: TableProps) => {
  const numberOfCols = data.headers.length;
  const hasTooltip = data.rows.some((row) => !!row.tooltip);
  const hasMoreMenu = data.rows.some((row) => row.more.length > 0);

  return (
    <Container data-testid="table" {...props}>
      <StyledRow
        hasSmallCol={hasTooltip || hasMoreMenu}
        numberOfColumns={numberOfCols}
        isResponsive={isResponsive}
        breakpoint={breakpoint}
        data-testid="header"
        isHeader
      >
        {data.headers &&
          data.headers.map((header, index) => {
            return (
              <Col
                key={`${index.toString()}-header`}
                isResponsive={isResponsive}
                breakpoint={breakpoint}
              >
                <Text muted size="small">
                  {header}
                </Text>
              </Col>
            );
          })}
      </StyledRow>
      {data.rows &&
        data.rows.map((row, index) => {
          return (
            <Row
              key={`${index.toString()}-row`}
              headers={data.headers}
              cols={row.cols}
              more={row.more}
              numberOfCols={numberOfCols}
              tooltip={row.tooltip}
              isResponsive={isResponsive}
              breakpoint={breakpoint}
            />
          );
        })}
    </Container>
  );
};

export type { TableProps, TableRowProps, TableColProps };

export default Table;
