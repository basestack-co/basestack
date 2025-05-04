import React from "react";
import { useTheme } from "styled-components";
import { animated } from "react-spring";
import { useFloatingPopup } from "@basestack/hooks";
// Components
import Text from "../Text";
import IconButton from "../IconButton";
import Avatar from "../Avatar";
import Popup from "../Popup";
import TextVisibility from "./TextVisibility";
import {
  Col,
  Container,
  ContentRow,
  PopupWrapper,
  StyledLink,
  StyledRow,
} from "./styles";
import { TableProps, RowProps, TableRowProps, TableColProps } from "./types";
import CopyClipboard from "./CopyClipboard";

const AnimatedPopup = animated(Popup);

const Row = ({ cols = [], more, numberOfCols, tooltip }: RowProps) => {
  const theme = useTheme();

  const {
    popupWrapperRef,
    x,
    y,
    refs,
    strategy,
    transition,
    getReferenceProps,
    getFloatingProps,
    onClickMore,
    onCloseMenu,
  } = useFloatingPopup({});

  return (
    <StyledRow numberOfColumns={numberOfCols} data-testid="row">
      {cols &&
        cols.map((col, index) => {
          const imageSrc = col.image?.src ?? "";
          const imageUsername = col.image?.userName ?? "";

          if (col.children) {
            return <Col key={`${index.toString()}-col`}>{col.children}</Col>;
          }

          return (
            <Col key={`${index.toString()}-col`}>
              {!!col.link ? (
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
        <Col>
          <PopupWrapper ref={popupWrapperRef}>
            <IconButton
              {...getReferenceProps}
              ref={refs.setReference}
              icon="more_horiz"
              onClick={onClickMore}
            />
            {transition(
              (styles, item) =>
                item && (
                  <AnimatedPopup
                    {...getFloatingProps}
                    ref={refs.setFloating}
                    style={styles}
                    position={strategy}
                    top={y}
                    left={x}
                    items={more}
                    onClickList={onCloseMenu}
                  />
                ),
            )}
          </PopupWrapper>
        </Col>
      )}
      {tooltip && (
        <Col>
          <CopyClipboard tooltip={tooltip} />
        </Col>
      )}
    </StyledRow>
  );
};

const Table = ({ data, ...props }: TableProps) => {
  const numberOfCols = data.headers.length;
  return (
    <Container data-testid="table" {...props}>
      <StyledRow numberOfColumns={numberOfCols} data-testid="header">
        {data.headers &&
          data.headers.map((header, index) => {
            return (
              <Col key={`${index.toString()}-header`}>
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
              cols={row.cols}
              more={data.rows.length > 1 ? row.more : []}
              numberOfCols={numberOfCols}
              tooltip={row.tooltip}
            />
          );
        })}
    </Container>
  );
};

export { type TableProps, type TableRowProps, type TableColProps };

export default Table;
