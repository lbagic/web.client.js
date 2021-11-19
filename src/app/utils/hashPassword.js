import { env } from "../config/env";

export const hashPassword = async (string) => {
  const secret = env.VUE_APP_SNT_PASSWORD_ENCRYPTION_KEY;
  const enc = new TextEncoder("utf-8");
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    algorithm,
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(string)
  );
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
