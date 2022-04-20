// MESSAGES

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

export const somethingWentWrong = "Something went wrong";

export const notAuthorizedCreateEnv =
  "You are not authorized to create an environment";

export const notAuthorizedUpdateEnv =
  "You are not authorized to update this environment";

export const notAuthorizedActionProject =
  "You are not authorized to do this action in this project";

export const notAuthorizedDeleteEnv =
  "You are not authorized to delete this environment";
