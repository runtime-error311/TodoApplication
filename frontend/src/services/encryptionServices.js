import * as CryptoJS from "crypto-js";
import { VITE_CRYPTO_SECRET } from "../constants/constant";

export const EncryptionService = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), VITE_CRYPTO_SECRET).toString();

};
