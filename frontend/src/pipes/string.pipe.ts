import CryptoJS from "crypto-js";

function decrypt(string: string) {
   const bytes = CryptoJS.AES.decrypt(string, import.meta.env.VITE_MESSAGE_SECRET);
   const decryptData = bytes.toString(CryptoJS.enc.Utf8);
   return JSON.parse(decryptData);
}
function truncate(string: string, limit: number) {
   return string?.length > limit ? string.substr(0, limit) + "..." : string;
}
export const string = { decrypt,truncate };
