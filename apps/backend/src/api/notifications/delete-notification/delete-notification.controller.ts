import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../models/user.model";
import { isValidObjectId } from "mongoose";

type ReqBody = {};

type ReqQuery = { notificationId: string; all: "true" };

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteNotificationController(req: Req, res: Response, next: NextFunction) {
   try {
      const { notificationId, all } = req.query;
      const quary = all === "true" //
            ? { $set: { notifications: [] } }
            : { $pull: { notifications: { notificationId } } };

      const user = await User.findByIdAndUpdate(req.user?.id, quary, { new: true }).select("+notifications");

      if (!user) {
         return next(createHttpError.NotFound("User not found"));
      }

      res.status(200).json({
         success: true,
         data: { notifications: user.notifications },
         message: "Notification deleted successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError("Failed to delete notification"));
   }
}
