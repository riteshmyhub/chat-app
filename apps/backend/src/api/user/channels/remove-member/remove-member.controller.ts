import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { isValidObjectId } from "mongoose";
import { SocketEmitter } from "../../../../socket/socket";
import Chat from "../../../../models/chat.model";

type ReqBody = {};

type ReqQuery = {
   memberID: string;
   channelID: string;
};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function RemoveMemberController(req: Req, res: Response, next: NextFunction) {
   try {
      const { memberID, channelID } = req.query;
      if (!channelID || !memberID) {
         return next(createHttpError.BadRequest("channelID and memberID required"));
      }
      if (!isValidObjectId(channelID) || !isValidObjectId(memberID)) {
         return next(createHttpError.BadRequest("Invalid channelID or memberID id"));
      }
      const channel = await Chat.findOne({
         _id: channelID,
         members: memberID,
         groupChat: true,
      }).populate("members", "profile _id email");
      if (!channel) {
         return next(createHttpError.BadRequest("channel not found or invalid member id"));
      }
      if (channel.creator?.toString() !== req.user?._id?.toString()) {
         return next(createHttpError.BadRequest("your not admin!"));
      }
      if (channel.creator?.toString() === memberID?.toString()) {
         return next(createHttpError.BadRequest("you are admin!"));
      }
      const members = channel?.members?.filter((member) => member?._id?.toString() !== memberID?.toString());
      channel.members = members;
      await channel.save();

      SocketEmitter({ req: req, eventName: "REFRESH_CHANNEL", to: [...members, memberID] });
      res.status(201).json({
         success: true,
         data: {
            members: channel.members,
         },
         message: "Remove member successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
