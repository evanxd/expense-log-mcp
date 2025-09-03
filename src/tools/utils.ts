type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

function successResponse(message: string, data: Json = null) {
  return JSON.stringify({
    success: true,
    code: "OK",
    message,
    data,
  });
}

function errorResponse(code: string, message: string, data: Json = null) {
  return JSON.stringify({
    success: false,
    code,
    message,
    data,
  });
}

function getErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An unknown error occurred";
  }
  return message;
}

export { successResponse, errorResponse, getErrorMessage }
