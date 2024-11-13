import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import User from "../../../../models/user.model";
import Chat from "../../../../models/chat.model";
import { SocketEmitter } from "../../../../socket/socket";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = { id: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteContactController(req: Req, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      if (!id || !isValidObjectId(id)) {
         return next(createHttpError.BadRequest("chatID required or invalid chatID!"));
      }
      const chat = await Chat.findOne({ _id: id, members: req.user });
      await chat?.deleteOne();

      SocketEmitter({
         req: req,
         eventName: "refresh_contacts",
         to: chat?.members,
      });

      res.status(200).json({
         message: "Contact deleted successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
