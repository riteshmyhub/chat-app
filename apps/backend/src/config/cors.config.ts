import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
   origin: ["https://chat-app-onh1.onrender.com", "http://localhost:3000"],
   credentials: true,
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
