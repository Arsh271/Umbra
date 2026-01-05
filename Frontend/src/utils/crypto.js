// crypto.js

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/* ---------- CREATE AES KEY FROM PASSWORD ---------- */
export async function getAESKey(password) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("note-app-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/* ---------- ENCRYPT ---------- */
export async function encryptText(text, password) {
  const key = await getAESKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

/* ---------- DECRYPT ---------- */
export async function decryptText(encrypted, password) {
  const key = await getAESKey(password);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(encrypted.iv) },
    key,
    new Uint8Array(encrypted.data)
  );

  return decoder.decode(decrypted);
}
