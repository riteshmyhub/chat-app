import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../../models/user.model";
import { isValidObjectId } from "mongoose";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {
   id: string;
};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetContactDetailsController(req: Req, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      if (!id || !isValidObjectId(id) || id.toString() === req.user?._id.toString()) {
         return next(createHttpError.BadRequest("Invaild user"));
      }
      const user = await User.findOne({ _id: req.user?._id, contacts: id }).populate("contacts", "-setting -contacts -isSetup -__v");

      if (!user) {
         return next(createHttpError.NotFound("Contact not found"));
      }

      res.status(200).json({
         success: true,
         data: {
            details: user?.contacts?.find((contact) => contact._id.toString() === id.toString()),
         },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
