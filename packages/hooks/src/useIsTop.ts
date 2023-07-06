import { useEffect, useState, useRef } from "react";

interface Props {
  offSet?: number;
}

const useIsTop = ({ offSet = 0 }: Props) => {
  const [isTop, setIsTop] = useState<boolean>(false);
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(
        element.current
          ? element.current.getBoundingClientRect().top <= offSet
          : false,
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offSet]);

  return [isTop, element] as const;
};

export default useIsTop;
