import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Sound from "../../../../models/sound.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

type Ringtone = {
   id: string;
   name: string;
   src: string;
   type: "notification" | "send" | "received";
};
export default async function GetRingtonesController(req: Req, res: Response, next: NextFunction) {
   try {
      const ringtones = await Sound.find();

      res.status(200).json({
         success: true,
         data: { ringtones },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
