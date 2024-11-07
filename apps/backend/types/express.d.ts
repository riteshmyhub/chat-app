// types/express.d.ts
import { Request } from "express";
import { Socket } from "socket.io";

declare global {
   namespace Express {
      interface Request {
         user?: any; // Assuming UserDocument is the type for your User model
      }
   }
}

declare module "socket.io" {
   interface Socket {
      user?: any | undefined;
   }
}
