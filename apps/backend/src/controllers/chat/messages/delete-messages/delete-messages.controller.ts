import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteMessagesController(req: Req, res: Response, next: NextFunction) {
   try {
      const body = req.body;
      res.status(201).json({
         success: true,
         data: {},
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
