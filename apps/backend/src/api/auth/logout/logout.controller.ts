import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import User from "../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function LogoutController(req: Req, res: Response, next: NextFunction) {
   try {
      const user = await User.findById(req.user?._id);
      if (!user) {
         return next(createHttpError.NotFound("User not found"));
      }
      user.deviceToken = null;
      await user.save();
      res.cookie("accessToken", "", { maxAge: 0 });
      res.status(200).json({
         message: "logout successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
