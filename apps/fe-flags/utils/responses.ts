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

export const notAuthorizedActionProject =
  "You are not authorized to do this action in this project";

// ENVIRONMENTS

export const notAuthorizedCreateEnv =
  "You are not authorized to create an environment";

export const notAuthorizedUpdateEnv =
  "You are not authorized to update this environment";

export const notAuthorizedDeleteEnv =
  "You are not authorized to delete this environment";

// FLAGS

export const notAuthorizedCreateFlag =
  "You are not authorized to create an flag";

export const notAuthorizedUpdateFlag =
  "You are not authorized to update this flag";

export const notAuthorizedDeleteFlag =
  "You are not authorized to delete this flag";

// HISTORY

export const notAuthorizedCreateHistory =
  "You are not authorized to create an history";

export const notAuthorizedUpdateHistory =
  "You are not authorized to update this history";
