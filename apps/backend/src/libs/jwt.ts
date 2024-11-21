import createHttpError from "http-errors";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/user.model";

type TokenData = {
   _id: Types.ObjectId;
   deviceToken: string | null | undefined;
};
export function createJwtLoginToken(tokenData: TokenData, res: Response) {
   const [value, unit] = String(process.env.TOKEN_EXPIRES_IN)?.split("-");
   const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
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
         .select("-__v +deviceToken")
         .populate("setting.notification_sound")
         .populate("setting.received_message_sound")
         .populate("setting.send_message_sound");
      if (!user) {
         throw createHttpError.Unauthorized("User not found");
      }
      if (user.deviceToken !== verifyUser?.deviceToken) {
         throw createHttpError.Unauthorized("Unauthorized devive");
      }
      return user;
   } catch (error: any) {
      throw error;
   }
}
