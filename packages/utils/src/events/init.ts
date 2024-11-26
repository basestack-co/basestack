declare function sa_event(eventName: string): void;

declare global {
  interface Window {
    sa_event?: (eventName: string) => void;
  }
}

export const saEvent = (eventName: string, data: any = {}): void => {
  if (typeof window !== "undefined" && typeof window.sa_event === "function") {
    window.sa_event(`event: ${eventName} data: ${JSON.stringify(data)}`);
  } else {
    console.info(`sa_event is not defined or is not a function.`);
  }
};
