// Utils
import { randomBytes, createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a secure token using a combination of a random UUID, timestamp, and a random string
 * @returns {string} The generated secure token
 */
export const generateSecureToken = () => {
  const randomUuid = uuidv4();
  const timestamp = Date.now().toString();
  const randomString = randomBytes(32).toString("hex");

  const combinedString = `${randomUuid}-${timestamp}-${randomString}`;
  return createHash("sha256").update(combinedString).digest("hex");
};

/**
 * Generates a unique ID from an email address using MD5 hashing
 * @param {string} email - The email address to generate an ID from
 * @returns {string} The generated unique ID
 */
export const emailToId = (email: string): string => {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
};
