import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetContactsController(req: Req, res: Response, next: NextFunction) {
   try {
      const user = await User.findById(req?.user?._id).populate("contacts", "-contacts -setting -isSetup -__v");

      res.status(200).json({
         success: true,
         data: { contacts: user?.contacts },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
