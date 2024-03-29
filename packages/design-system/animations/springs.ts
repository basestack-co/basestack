// Sharable transition configurations for React Spring

export const scaleInTopRight = {
  from: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
  enter: { opacity: 1, scale: 1, transformOrigin: "100% 0%" },
  leave: { opacity: 0, scale: 0, transformOrigin: "100% 0%" },
};

export const scaleInTopLeft = {
  from: { opacity: 0, scale: 0, transformOrigin: "0% 0%" },
  enter: { opacity: 1, scale: 1, transformOrigin: "0% 0%" },
  leave: { opacity: 0, scale: 0, transformOrigin: "0% 0%" },
};

export const slideTop = {
  from: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` },
  enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
  leave: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` },
};

export const slideInLeft = {
  from: { opacity: 0, transform: `translateX(-50px)` },
  enter: { opacity: 1, transform: `translateX(0)` },
  leave: { opacity: 0, transform: `translateX(-50px)` },
};

export const slideBottom = {
  from: { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
  enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
  leave: { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
};

export const fadeIn = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
};
