import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

type ReqBody = { email: string; password: string; confirmPassword: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetSessionController(req: Req, res: Response, next: NextFunction) {
   try {
      res.status(200).json({
         message: "user successfully fatched!",
         data: { user: req?.user },
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
