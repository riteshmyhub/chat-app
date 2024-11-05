import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default function createJwtLoginToken(_id: Types.ObjectId, res: Response) {
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
