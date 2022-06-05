import React, { useCallback, useState } from "react";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useTransition, animated, config } from "react-spring";
import get from "lodash.get";
import { Text, IconButton, Avatar } from "../../atoms";
import { scaleInTopRight } from "../../animations/springs";
import {
  Col,
  Container,
  ContentRow,
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
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

  return (
    <StyledRow numberOfColumns={numberOfCols} data-testid="row">
      {cols &&
        cols.map((col, index) => {
          const imageSrc = get(col, "image.src");
          const imageUsername = get(col, "image.userName");
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
        <IconButton ref={reference} icon="more_horiz" onClick={onClickMore} />
        {transitionPopup(
          (styles, item) =>
            item && (
              <AnimatedPopup
                style={styles}
                ref={floating}
                position={strategy}
                top={y}
                left={x}
                items={more}
              />
            )
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
              more={row.more}
              numberOfCols={numberOfCols}
            />
          );
        })}
    </Container>
  );
};

export default Table;
