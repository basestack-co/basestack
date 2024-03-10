import React, { useEffect, useRef } from "react";
import { Button, ButtonVariant } from "@basestack/design-system";
import { animated, useSpring } from "react-spring";
import { SubMenuContainer, SubMenuWrapper } from "./styles";
import { ButtonSharedProps } from "./types";

const AnimatedMenu = animated(SubMenuContainer);

export interface SubMenuProps {
  onDeleteAll: () => void;
  onMarkSpamAll: () => void;
  onUnMarkSpamAll: () => void;
  onReadSubmissions: () => void;
  onUnReadSubmissions: () => void;
  isOpen: boolean;
}

const SubMenu = ({
  onDeleteAll,
  onMarkSpamAll,
  onUnMarkSpamAll,
  onReadSubmissions,
  onUnReadSubmissions,
  isOpen,
}: SubMenuProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [style, animate] = useSpring(
    () => ({
      opacity: 0,
      height: 0,
      config: { duration: 200 },
    }),
    [],
  );

  useEffect(() => {
    if (contentRef.current) {
      animate.start({
        height: isOpen ? contentRef.current.offsetHeight + 20 : 0,
        opacity: isOpen ? 1 : 0,
      });
    }
  }, [animate, isOpen]);

  const buttonProps = {
    variant: ButtonVariant.Tertiary,
    iconPlacement: "left",
  } as ButtonSharedProps;

  return (
    <AnimatedMenu style={style}>
      <SubMenuWrapper ref={contentRef}>
        <Button {...buttonProps} icon="delete" onClick={onDeleteAll}>
          Delete all 3
        </Button>
        <Button {...buttonProps} icon="report" onClick={onMarkSpamAll}>
          Mark as Spam
        </Button>
        <Button {...buttonProps} icon="report_off" onClick={onUnMarkSpamAll}>
          Unmark Spam
        </Button>
        <Button
          {...buttonProps}
          icon="mark_email_read"
          onClick={onReadSubmissions}
        >
          Read Submissions
        </Button>
        <Button
          {...buttonProps}
          icon="mark_email_unread"
          onClick={onUnReadSubmissions}
        >
          Un-Read Submissions
        </Button>
      </SubMenuWrapper>
    </AnimatedMenu>
  );
};

export default SubMenu;
