import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import User from "../../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = { id: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteContactController(req: Req, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      if (!id || !isValidObjectId(id) || id.toString() === req.user?._id.toString()) {
         return next(createHttpError.BadRequest("Invaild user"));
      }
      const user = await User.findOne({ _id: req.user?._id, contacts: id }).select("-profile -setting -email -isSetup -__v");
      if (!user) {
         return next(createHttpError.NotFound("Contact not found"));
      }
      user.contacts = user?.contacts?.filter((contact) => contact.toString() !== id.toString());
      await user.save();

      res.status(201).json({
         success: true,
         data: {},
         message: "contact successfully delete",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
