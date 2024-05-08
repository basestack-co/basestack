import React from "react";
import { rem } from "polished";
import { animated } from "react-spring";
import { LayoutProps, SpaceProps } from "styled-system";
import { useFloatingPopup } from "@basestack/hooks";
import { useTheme } from "styled-components";
// Components
import Popup, { PopupProps } from "../Popup";
import IconButton from "../IconButton";
import { Button, ButtonVariant } from "../Button";
import Input from "../Input";
import { ButtonContainer, Container, InputContainer } from "./styles";

export interface SearchProps extends SpaceProps, LayoutProps {
  placeholder: string;
  value: string;
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  filter?: {
    selected: string;
    isDisabled: boolean;
    options: PopupProps["items"];
  };
}

const AnimatedPopup = animated(Popup);

const Search = ({
  placeholder,
  onChange,
  value,
  isDisabled,
  onClear,
  filter,
  ...props
}: SearchProps) => {
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
    isPopupOpen,
  } = useFloatingPopup({});

  return (
    <Container hasFilter={!!filter} ref={popupWrapperRef} {...props}>
      <InputContainer>
        <Input
          name="search"
          size="small"
          width="100%"
          isDarker
          icon="search"
          iconPlacement="left"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          isDisabled={isDisabled}
        />
        {!!value && (
          <IconButton
            size="small"
            variant="secondaryDark"
            position="absolute"
            right={filter ? theme.spacing.s1 : rem("10px")}
            icon="close"
            onClick={onClear}
          />
        )}
      </InputContainer>
      {filter && (
        <>
          <ButtonContainer {...getReferenceProps} ref={refs.setReference}>
            <Button
              onClick={onClickMore}
              variant={ButtonVariant.Neutral}
              icon={isPopupOpen ? "arrow_drop_up" : "arrow_drop_down"}
              iconPlacement="right"
              justifyContent="space-between"
              fullWidth
              pr={theme.spacing.s1}
              isDisabled={filter.isDisabled}
            >
              {filter.selected}
            </Button>
          </ButtonContainer>
          {transition(
            (styles, item) =>
              item && (
                <AnimatedPopup
                  {...getFloatingProps}
                  ref={refs.setFloating}
                  style={styles}
                  position={strategy}
                  top={y + 5}
                  left={x}
                  items={filter.options}
                  onClickList={onCloseMenu}
                />
              ),
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
