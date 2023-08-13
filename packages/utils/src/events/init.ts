interface UmamiTracker {
  track: (event: string, data: any) => void;
}

declare var umami: any;

const umamiTracker: UmamiTracker = {
  track: (event, data) => {
    // Check if umami is available
    if (typeof umami !== "undefined" && typeof umami.track === "function") {
      umami.track(event, data);
    }
  },
};

export default umamiTracker;
