import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId, ObjectId } from "mongoose";
import User from "../../../../models/user.model";
import { SocketEmitter } from "../../../../socket/socket";
import FirebaseNotification from "../../../../firebase/notification/notification";

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
      const [person, me] = await Promise.all([
         User.findById(userID), //
         User.findById(req.user?._id),
      ]);

      if (!person || req.user?._id.toString() === userID.toString()) {
         return next(createHttpError.NotFound("user not found"));
      }
      if (me?.contacts.some((contact) => contact?.person?.toString() === userID?.toString())) {
         return next(createHttpError.BadRequest("Contact alrady exiest"));
      }
      const isMeInPersonContacts = person?.contacts.find((contact) => contact.person?.toString() === req.user?._id.toString());

      const chatID = isMeInPersonContacts //
         ? isMeInPersonContacts.chatID
         : [me?._id.toString(), person._id.toString()].sort().join("-");

      me?.contacts.push({ chatID, person: userID });
      await me?.save();

      res.status(201).json({
         message: "contact successfully added",
         success: true,
         data: {},
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
