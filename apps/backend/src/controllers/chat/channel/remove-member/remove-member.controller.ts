import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Chat from "../../../../models/chat.model";
import { isValidObjectId } from "mongoose";
import { SocketEmitter } from "../../../../socket/socket";

type ReqBody = {};

type ReqQuery = {
   memberID: string;
   chatID: string;
};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function RemoveMemberController(req: Req, res: Response, next: NextFunction) {
   try {
      const { memberID, chatID } = req.query;
      if (!chatID || !memberID) {
         return next(createHttpError.BadRequest("chatID and memberID required"));
      }
      if (!isValidObjectId(chatID) || !isValidObjectId(memberID)) {
         return next(createHttpError.BadRequest("Invalid chatID or memberID id"));
      }
      const channel = await Chat.findOne({
         _id: chatID,
         groupChat: true,
         members: memberID,
      });
      if (!channel) {
         return next(createHttpError.BadRequest("chat not found or not a channel type!"));
      }
      if (channel.creator?.toString() !== req.user?._id?.toString()) {
         return next(createHttpError.BadRequest("your not admin!"));
      }
      if (channel.creator?.toString() === memberID?.toString()) {
         return next(createHttpError.BadRequest("your admin!"));
      }
      const members = channel?.members?.filter((member) => member?.toString() !== memberID?.toString());
      channel.members = members;
      await channel.save();

      SocketEmitter({ req: req, eventName: "REFRESH_CHATS", to: [...members, memberID] });
      res.status(201).json({
         success: true,
         data: {},
         message: "Remove member successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
