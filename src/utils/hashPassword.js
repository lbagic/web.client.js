const secretKey = process.env.VUE_APP_PASSWORKD_ENCRYPTION_KEY;

if (!secretKey)
  throw new Error(
    "Cant use hashPassword methoud without VUE_APP_PASSWORKD_ENCRYPTION_KEY."
  );

export const hashPassword = async (string) => {
  const secret = secretKey; // the secret key
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
