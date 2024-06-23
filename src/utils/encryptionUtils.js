// encryptionUtils.js
import CryptoJS from "crypto-js";

const secretKey = CryptoJS.enc.Hex.parse(process.env.REACT_APP_DECRYPT_KEY); // Use a secure key

export const encrypt = (text) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv: iv });
  return `${iv.toString()}:${encrypted.toString()}`;
};

export const decrypt = (ciphertext) => {
  const [iv, encryptedText] = ciphertext.split(":");
  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
