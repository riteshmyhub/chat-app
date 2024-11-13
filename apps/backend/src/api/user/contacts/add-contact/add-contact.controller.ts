import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId, ObjectId } from "mongoose";
import User from "../../../../models/user.model";
import Chat from "../../../../models/chat.model";
import { SocketEmitter } from "../../../../socket/socket";

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
      const user = await User.findById(userID);

      if (!user || req.user?._id.toString() === userID.toString()) {
         return next(createHttpError.NotFound("user not found"));
      }
      const personWithAuthUser = [userID, req?.user?._id];

      const oneToOneChat = await new Chat({
         groupChat: false,
         creator: req?.user?._id,
         members: personWithAuthUser,
      });
      await oneToOneChat.save();

      SocketEmitter({
         req: req,
         eventName: "refresh_contacts",
         to: personWithAuthUser,
      });

      res.status(201).json({
         message: "contact successfully added",
         success: true,
         data: {},
      });   
      
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
