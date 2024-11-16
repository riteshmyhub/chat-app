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
      if (!email || !password) {
         return next(createHttpError.BadRequest("email , password required!"));
      }
      const user = await User.findOne({ email }).select("+password +fcm_token");
      if (!user) {
         return next(createHttpError.NotFound("entry not exist"));
      }
      let match = await compare(password, user.password);
      if (!match) {
         return next(createHttpError.Unauthorized());
      }

      const accessToken = createJwtLoginToken(user?._id as Types.ObjectId, res);

      if (user?.fcm_token !== fcmToken) {
         user.fcm_token = fcmToken;
         await user.save();
      }

      res.status(200).json({
         message: "login successfully",
         data: accessToken ? { accessToken } : {},
         success: true,
      });
   } catch (error) {
      console.log(error);

      next(createHttpError.InternalServerError());
   }
}
