import { RefObject, useEffect, useRef } from "react";
import { off, on } from "@basestack/utils";

const defaultEvents = ["click"];

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref;
      el &&
        // @ts-ignore
        !el.contains(event.target as Node) &&
        savedCallback.current(event as E);
    };
    for (const eventName of events) {
      // @ts-ignore
      on(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        // @ts-ignore
        off(document, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
