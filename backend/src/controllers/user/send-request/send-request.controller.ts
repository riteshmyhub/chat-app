import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import SendRequest from "../../../models/request.model";

type ReqBody = { to: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function SendRequestController(req: Req, res: Response, next: NextFunction) {
   try {
      const { to } = req.body;
      const newRequest = new SendRequest({
         to: to,
         form: req.user?._id,
      });
      await newRequest.save();
      //.populate("to", "profile.first_name profile.last_name profile.avatar _id email")
      res.status(201).json({
         success: true,
         data: {},
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
