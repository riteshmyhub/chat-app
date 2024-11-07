import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Chat from "../../../../models/chat.model";
import Message from "../../../../models/message.model";
import { SocketEmitter } from "../../../../socket/socket";
import { isValidObjectId } from "mongoose";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = { chatID: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteChatController(req: Req, res: Response, next: NextFunction) {
   try {
      const { chatID } = req.params;
      if (!chatID || !isValidObjectId(chatID)) {
         return next(createHttpError.BadRequest("chatID required or invalid chatID!"));
      }
      const chat = await Chat.findOne({ _id: chatID, members: req.user });
      await Message.deleteMany({ chat: chat?._id });
      await chat?.deleteOne();

      SocketEmitter({
         req: req,
         eventName: "REFRESH_CHATS",
         to: chat?.members,
      });

      res.status(200).json({
         message: "chat deleted successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
