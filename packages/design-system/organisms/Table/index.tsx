import React, { useCallback, useRef, useState } from "react";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useTransition, animated, config } from "react-spring";
import { useClickAway } from "@basestack/hooks";
import { getValue } from "@basestack/utils";
import { Text, IconButton, Avatar } from "../../atoms";
import { scaleInTopRight } from "../../animations/springs";
import {
  Col,
  Container,
  ContentRow,
  PopupWrapper,
  Placeholder,
  StyledLink,
  StyledRow,
} from "./styles";
import { Popup } from "../../molecules";
import { TableProps, RowProps } from "./types";
import { useTheme } from "styled-components";

const AnimatedPopup = animated(Popup);

const Row = ({ cols = [], more, numberOfCols }: RowProps) => {
  const theme = useTheme();
  const popupWrapperRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const onClickMore = useCallback(() => {
    setIsPopupOpen((prevState) => !prevState);
  }, []);

  const transitionPopup = useTransition(isPopupOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopRight,
  });

  useClickAway(popupWrapperRef, () => {
    setIsPopupOpen(false);
  });

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
              ref={refs.setReference}
              icon="more_horiz"
              onClick={onClickMore}
            />
            {transitionPopup(
              (styles, item) =>
                item && (
                  <AnimatedPopup
                    style={styles}
                    ref={refs.setFloating}
                    position={strategy}
                    top={y}
                    left={x}
                    items={more}
                  />
                )
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
