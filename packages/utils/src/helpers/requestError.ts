class RequestError extends Error {
  code: number;
  url: string;

  constructor({
    code,
    url,
    message,
  }: {
    code: number;
    url: string;
    message: string;
  }) {
    super(message);
    this.code = code;
    this.url = url;

    this.name = "RequestError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }
  }
}

export default RequestError;
