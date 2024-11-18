import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { compare } from "bcrypt";
import User from "../../../models/user.model";
import { createJwtLoginToken } from "../../../libs/jwt";
import { Types } from "mongoose";

type ReqBody = { email: string; password: string; fcmToken: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function LoginController(req: Req, res: Response, next: NextFunction) {
   try {
      const { email, password, fcmToken } = req.body;
      if (!email || !password || !fcmToken) {
         return next(createHttpError.BadRequest("email , password ,fcmToken  required!"));
      }
      const user = await User.findOne({ email }).select("+password +fcm_token");
      if (!user) {
         return next(createHttpError.NotFound("entry not exist"));
      }
      let match = await compare(password, user.password);
      if (!match) {
         return next(createHttpError.Unauthorized());
      }
      user.fcm_token = fcmToken;
      await user.save();

      const tokenData = { _id: user?._id, deviceToken: user?.fcm_token };
      const accessToken = createJwtLoginToken(tokenData, res);

      res.status(200).json({
         message: "login successfully",
         data: accessToken ? { accessToken } : {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
