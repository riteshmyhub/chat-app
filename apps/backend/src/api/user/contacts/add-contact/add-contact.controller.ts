import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId, ObjectId } from "mongoose";
import User from "../../../../models/user.model";

type ReqBody = { userID: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function AddContactController(req: Req, res: Response, next: NextFunction) {
   try {
      const { userID } = req.body;

      if (!userID || !isValidObjectId(userID) || req.user?._id.toString() === userID.toString()) {
         return next(createHttpError.BadRequest("invaild user"));
      }

      const [user, reqUser] = await Promise.all([User.findById(userID), User.findById(req.user?._id)]);

      if (!user || !reqUser || reqUser._id.toString() === userID.toString()) {
         return next(createHttpError.NotFound("user not found"));
      }

      if (reqUser.contacts.some((contact) => contact.toString() === userID.toString())) {
         return next(createHttpError.BadRequest("this contact is already exist"));
      }
      reqUser.contacts.push(userID as any);
      await reqUser.save();

      res.status(201).json({
         success: true,
         data: {},
         message: "contact successfully added",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
