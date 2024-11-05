import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Socket } from "socket.io";
import User from "../models/user.model";

export default async function SocketAuthMiddleware(socket: Socket, next: (err?: any) => void) {
   try {
      const token = socket.handshake.auth?.token as string;

      if (!token) {
         return next(createHttpError.Unauthorized("Your unauthorized"));
      }
      const verifyUser: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      const user = await User.findById(verifyUser?._id)
         .select("-__v -contacts") //
         .populate("setting.notification_sound")
         .populate("setting.received_message_sound")
         .populate("setting.send_message_sound");
      socket.user = user;
      next();
   } catch (error: any) {
      if (error.name === "TokenExpiredError") {
         return next(createHttpError.Forbidden("Token expired"));
      }
      if (error.name === "JsonWebTokenError") {
         return next(createHttpError.Unauthorized("Invalid token"));
      }
      next(createHttpError.InternalServerError());
   }
}
