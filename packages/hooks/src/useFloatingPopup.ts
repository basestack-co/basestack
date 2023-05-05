import { useState, useRef, useCallback } from "react";
import { scaleInTopRight } from "@basestack/design-system";
import { useTransition, config } from "react-spring";
import {
  useFloating,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

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
  } as const;
};

export default useFloatingPopup;
