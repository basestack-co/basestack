import {
  autoUpdate,
  Placement,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useCallback, useRef, useState } from "react";
import { config, useTransition } from "react-spring";

export interface AnimationConfig {
  [key: string]: {
    from: { opacity: number; scale: number; transformOrigin: string };
  };
}

export interface UseFloatingPopupProps {
  placement?: Placement;
}

const scaleInTopRight = {
  from: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
  enter: { opacity: 1, scale: 1, transformOrigin: "100% 0%" },
  leave: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
};

const scaleInTopLeft = {
  from: { opacity: 0, scale: 0, transformOrigin: "0% 0%" },
  enter: { opacity: 1, scale: 1, transformOrigin: "0% 0%" },
  leave: { opacity: 0, scale: 0, transformOrigin: "0% 0%" },
};

const animationConfigs: AnimationConfig = {
  "bottom-end": scaleInTopRight,
  "bottom-start": scaleInTopLeft,
};

const useFloatingPopup = ({
  placement = "bottom-end",
}: UseFloatingPopupProps) => {
  const popupWrapperRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open: isPopupOpen,
    onOpenChange: setIsPopupOpen,
    placement,
    whileElementsMounted: autoUpdate,
  });

  const transition = useTransition(isPopupOpen, {
    config: { ...config.default, duration: 150 },
    ...animationConfigs[placement],
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
    isPopupOpen,
  } as const;
};

export default useFloatingPopup;
