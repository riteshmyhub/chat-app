import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Sound from "../../../models/sound.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetSessionController(req: Req, res: Response, next: NextFunction) {
   try {
      const ringtones = await Sound.find();
      res.status(200).json({
         message: "user successfully fatched!",
         data: {
            user: (req as any)?.user,
            appSettings: { ringtones },
         },
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
//
