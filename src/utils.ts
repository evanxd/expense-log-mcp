type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

/**
 * Generates a success response object.
 *
 * @param message - The success message.
 * @param data - Optional data to include in the response.
 * @returns A JSON string representing the success response.
 */
export function successResponse(message: string, data: Json = null) {
  return JSON.stringify({
    success: true,
    code: "OK",
    message,
    data,
  });
}

/**
 * Generates an error response object.
 *
 * @param code - The error code.
 * @param message - The error message.
 * @param data - Optional data to include in the response.
 * @returns A JSON string representing the error response.
 */
export function errorResponse(code: string, message: string, data: Json = null) {
  return JSON.stringify({
    success: false,
    code,
    message,
    data,
  });
}

/**
 * Extracts a user-friendly error message from an unknown error type.
 *
 * @param error - The error object or value.
 * @returns A string representing the error message.
 */
export function getErrorMessage(error: unknown): string {
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

/**
 * Generates a unique ID based on the current timestamp and a sequence number.
 * This helps ensure uniqueness even if called multiple times within the same millisecond.
 *
 * @returns A unique ID string.
 */
export const generateId = (() => {
  let lastTimestamp = 0;
  let sequence = 0;
  return () => {
    const now = Date.now();
    if (now === lastTimestamp) {
      sequence++;
    } else {
      lastTimestamp = now;
      sequence = 0;
    }
    return `${now}-${sequence}`;
  };
})();
