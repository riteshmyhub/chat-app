import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetNotificationsController(req: Req, res: Response, next: NextFunction) {
   try {
      const user = await User.findById(req?.user?._id).select("+notifications");
      res.status(200).json({
         success: true,
         data: {
            notifications: user?.notifications?.sort((a, b) => b.date.getTime() - a.date.getTime()) || [],
         },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
