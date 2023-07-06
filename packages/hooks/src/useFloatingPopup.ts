import { useState, useRef, useCallback } from "react";
import { useTransition, config } from "react-spring";
import {
  useFloating,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

const scaleInTopRight = {
  from: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
  enter: { opacity: 1, scale: 1, transformOrigin: "100% 0%" },
  leave: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
};

const useFloatingPopup = () => {
  const popupWrapperRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open: isPopupOpen,
    onOpenChange: setIsPopupOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const transition = useTransition(isPopupOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopRight,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const onClickMore = useCallback(() => {
    setIsPopupOpen((prevState) => !prevState);
  }, []);

  const onCloseMenu = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  return {
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
  } as const;
};

export default useFloatingPopup;
