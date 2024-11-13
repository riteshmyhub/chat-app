import createHttpError from "http-errors";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/user.model";

export function createJwtLoginToken(_id: Types.ObjectId, res: Response) {
   const [value, unit] = String(process.env.TOKEN_EXPIRES_IN)?.split("-");
   const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: `${value}${unit}`,
   });
   if (process.env.AUTH_MODE === "HTTP_COOKIE") {
      res.cookie("accessToken", token, {
         expires: new Date(Date.now() + Number(value) * 60 * 1000),
         httpOnly: true,
         sameSite: "strict",
         secure: process.env.NODE_ENV !== "development",
      });
      return null;
   } else {
      return token;
   }
}
export async function verifyToken(accessToken: string) {
   try {
      const verifyUser: any = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string);
      const user = await User.findById(verifyUser?._id) //
         .select("-__v")
         .populate("setting.notification_sound")
         .populate("setting.received_message_sound")
         .populate("setting.send_message_sound");
      if (!user) {
         throw createHttpError.Unauthorized("User not found");
      }
      return user;
   } catch (error: any) {
      throw error;
   }
}
