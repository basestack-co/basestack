export const unauthorized = {
  code: 401,
  error: true,
  message: "You must be sign in to view the protected content on this page.",
};

export const methodNotAllowed = {
  code: 405,
  error: true,
  message: `The HTTP method is not supported at this route.`,
};
