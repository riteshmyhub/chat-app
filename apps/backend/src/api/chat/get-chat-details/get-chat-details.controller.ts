import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import Channel from "../../../models/channel.model";
import User from "../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};
type ReqParms = { id: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetChatDetailsController(req: Req, res: Response, next: NextFunction) {
   try {
      const chatID = req.params.id;

      const contact: any = await User.findOne(
         { _id: req?.user?._id, "contacts.chatID": chatID }, //
         { "contacts.$": 1 }
      )
         .populate("contacts.person", "profile _id email")
         .then((user) => user?.contacts[0]);
      const isChannel = !contact;

      if (!chatID || (isChannel && !isValidObjectId(chatID))) {
         return next(createHttpError.BadRequest("chatID id required or invalid chatID"));
      }

      const channel = isChannel
         ? await Channel.findOne({
              _id: chatID,
              members: req.user?._id,
           }).populate("members", "profile _id email")
         : null;

      const chat = !channel || !contact;
      if (!chat) {
         return next(createHttpError.NotFound("chat not found!"));
      }

      const tsChat = Object.seal({
         _id: isChannel ? channel?._id : contact?.chatID,
         groupChat: isChannel,
         avatar: isChannel ? channel?.avatar : contact?.person?.profile?.avatar,
         name: isChannel ? channel?.name : `${contact?.person?.profile?.first_name} ${contact?.person?.profile?.last_name}`,
         about: isChannel ? channel?.about : contact?.person?.profile?.about,
         members: isChannel
            ? channel?.members
            : [
                 { _id: contact?.person?._id }, //
                 { _id: req.user?._id },
              ],
         creator: isChannel ? channel?.admin : req.user?._id,
      });

      res.status(200).json({
         success: true,
         data: {
            details: tsChat,
         },
         message: "messages successfully fatched",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
