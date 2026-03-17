import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
const CRYPTO_SECRET = process.env.CRYPTO_SECRET;
export const decryptData = (encryptedData) => {
    try {
        if (!CRYPTO_SECRET) {
            throw new Error("CRYPTO_SECRET is required!");
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error("Invalid encrypted data");
        }
        return JSON.parse(decrypted);
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Decryption error: ${err.message}`);
        }
        throw new Error("Unknown decryption error");
    }
};
//# sourceMappingURL=decryptionServices.js.map