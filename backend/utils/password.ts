import crypto from "crypto";

const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$";

export function generateTemporaryPassword(
  length = 10
) {
  const bytes = crypto.randomBytes(length);

  return Array.from(bytes)
    .map(
      (byte) =>
        CHARACTERS[
          byte % CHARACTERS.length
        ]
    )
    .join("");
}