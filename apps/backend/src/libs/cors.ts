import dotenv from "dotenv";

dotenv.config();
const corsConfig = {
   origin: [
      "http://192.168.1.153:3000", //office
      "http://192.168.1.43:3000", //home
   ],
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
   credentials: true,
};
export default corsConfig;
