import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Sound from "../../../models/sound.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetSessionController(req: Req, res: Response, next: NextFunction) {
   try {
      res.status(200).json({
         message: "user successfully fatched!",
         data: {
            user: (req as any)?.user,
         },
         success: true,
      });
   } catch (error) {
      console.log(error);
      next(createHttpError.InternalServerError());
   }
}
//
