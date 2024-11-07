import CryptoJS from "crypto-js";

export function encrypt(sring: string) {
   const encryptedData = CryptoJS.AES.encrypt(sring, process.env.MESSAGE_SECRET as string).toString();
   return encryptedData;
}
