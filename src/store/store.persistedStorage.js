export const persistedStorage = localStorage;

// import SecureLS from "secure-ls";

// const storageEncryptionKey = process.env.VUE_APP_LOCALSTORAGE_ENCRYPTION_KEY;

// const storage = new SecureLS({
//   encodingType: "des",
//   isCompression: false,
//   encryptionSecret: storageEncryptionKey,
// });

// export const secureLS = {
//   getItem: (key) => storage.get(key),
//   setItem: (key, data) => storage.set(key, data),
//   removeItem: (key) => storage.remove(key),
//   clear: () => storage.clear(),
// };
