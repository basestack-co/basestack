import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps): JSX.Element => {
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // @ts-ignore
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  // @ts-ignore
  return <>{mounted ? createPortal(children, ref.current) : null}</>;
};

export default Portal;
