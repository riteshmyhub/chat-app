import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

type ReqBody = { email: string; password: string; confirmPassword: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function AuthMiddleware(req: Req, res: Response, next: NextFunction) {
   try {
      const accessToken = req.cookies.accessToken || req.headers["authorization"]?.split("bearer ")[1];
      if (!accessToken) {
         return next(createHttpError.Unauthorized("your unauthorized"));
      }
      const verifyUser: any = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string);
      const user = await User.findById(verifyUser?._id)
         .select("-__v -contacts") //
         .populate("setting.notification_sound")
         .populate("setting.received_message_sound")
         .populate("setting.send_message_sound");
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
