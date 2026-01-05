if (!window.crypto || !window.crypto.subtle) {
  throw new Error("Web Crypto API not supported in this browser");
}

export async function generateKeyPair() {
  return await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportKey(key, type) {
  const format = type === "public" ? "spki" : "pkcs8";
  const raw = await crypto.subtle.exportKey(format, key);
  return btoa(String.fromCharCode(...new Uint8Array(raw)));
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function importPublicKey(base64) {
  return await crypto.subtle.importKey(
    "spki",
    base64ToArrayBuffer(base64),
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"]
  );
}

export async function importPrivateKey(base64) {
  return await crypto.subtle.importKey(
    "pkcs8",
    base64ToArrayBuffer(base64),
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  );
}

export async function encryptWithPublicKey(publicKeyBase64, secret) {
  const publicKey = await importPublicKey(publicKeyBase64);
  const encoded = new TextEncoder().encode(secret);
  const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function decryptWithPrivateKey(privateKeyBase64, encryptedSecretBase64) {
  const privateKey = await importPrivateKey(privateKeyBase64);
  const encrypted = base64ToArrayBuffer(encryptedSecretBase64);
  const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encrypted);
  return new TextDecoder().decode(decrypted);
}

export const generateNoteKey = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};
