import { useState, useEffect } from "react";

export interface LoaderProps {
  hasDelay?: boolean;
  delayTime?: number;
  children?: React.ReactNode;
}

const Loader = ({
  children,
  hasDelay = true,
  delayTime = 1000,
}: LoaderProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasDelay) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, delayTime);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hasDelay, delayTime]);

  if (!show && hasDelay) return null;

  return <>{children}</>;
};

export default Loader;
