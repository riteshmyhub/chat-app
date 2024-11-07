import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../../models/user.model";

type ReqBody = {
   notification_sound: string;
   received_message_sound: string;
   send_message_sound: string;
};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function ChangeRingtoneController(req: Req, res: Response, next: NextFunction) {
   try {
      const { notification_sound, received_message_sound, send_message_sound } = req.body;

      const updateFields: any = {};
      if (notification_sound) updateFields["setting.notification_sound"] = notification_sound;
      if (received_message_sound) updateFields["setting.received_message_sound"] = received_message_sound;
      if (send_message_sound) updateFields["setting.send_message_sound"] = send_message_sound;

      const user = await User.findByIdAndUpdate(
         req.user?._id,
         { $set: updateFields },
         {
            new: true,
            runValidators: true,
         }
      )
         .populate("setting.notification_sound")
         .populate("setting.received_message_sound")
         .populate("setting.send_message_sound");

      res.status(201).json({
         success: true,
         data: {
            ringtone: {
               notification_sound: user?.setting?.notification_sound,
               received_message_sound: user?.setting?.received_message_sound,
               send_message_sound: user?.setting?.send_message_sound,
            },
         },
         message: "Ringtone successfully changed",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
