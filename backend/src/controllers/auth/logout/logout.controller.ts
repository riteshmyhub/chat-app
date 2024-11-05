import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function LogoutController(req: Req, res: Response, next: NextFunction) {
   try {
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
