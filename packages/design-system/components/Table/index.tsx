import React from "react";
import { useTheme } from "styled-components";
import { animated } from "react-spring";
import { getValue } from "@basestack/utils";
import { useFloatingPopup } from "@basestack/hooks";
// Components
import Text from "../Text";
import IconButton from "../IconButton";
import Avatar from "../Avatar";
import Popup from "../Popup";
import {
  Col,
  Container,
  ContentRow,
  PopupWrapper,
  Placeholder,
  StyledLink,
  StyledRow,
} from "./styles";
import { TableProps, RowProps } from "./types";

const AnimatedPopup = animated(Popup);

const Row = ({ cols = [], more, numberOfCols }: RowProps) => {
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
  } = useFloatingPopup();

  return (
    <StyledRow numberOfColumns={numberOfCols} data-testid="row">
      {cols &&
        cols.map((col, index) => {
          const imageSrc = getValue(col, "image.src");
          const imageUsername = getValue(col, "image.userName");
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
                  <Text fontWeight="400" size="small">
                    {col.title}
                  </Text>
                </ContentRow>
              )}
            </Col>
          );
        })}
      <Col>
        {more.length > 0 ? (
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
        ) : (
          <Placeholder />
        )}
      </Col>
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
        <Placeholder />
      </StyledRow>
      {data.rows &&
        data.rows.map((row, index) => {
          return (
            <Row
              key={`${index.toString()}-row`}
              cols={row.cols}
              more={data.rows.length > 1 ? row.more : []}
              numberOfCols={numberOfCols}
            />
          );
        })}
    </Container>
  );
};

export default Table;
