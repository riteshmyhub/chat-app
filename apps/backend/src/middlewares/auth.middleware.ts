import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io";
import { verifyToken } from "../libs/jwt";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
   try {
      const accessToken = req?.cookies?.accessToken || req.headers["authorization"]?.split("bearer ")[1];
      if (!accessToken) {
         return next(createHttpError.Unauthorized("your unauthorized"));
      }
      const user = await verifyToken(accessToken);
      req.user = user;

      req.user = user;
      return next();
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

export async function AuthSocket(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: any) => void) {
   try {
      const token = socket.request.headers.cookie?.split("accessToken=")[1];
      if (!token) {
         return next(createHttpError.Unauthorized("Your unauthorized"));
      }
      const user = await verifyToken(token);
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
