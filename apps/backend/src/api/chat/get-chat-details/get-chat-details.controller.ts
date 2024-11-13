import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import Chat from "../../../models/chat.model";

type ReqBody = {};

type ReqQuery = {};
type ReqParms = { id: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetChatDetailsController(req: Req, res: Response, next: NextFunction) {
   try {
      const chatID = req.params.id;

      if (!chatID || !isValidObjectId(chatID)) {
         return next(createHttpError.BadRequest("chatID id required or invalid chatID"));
      }
      const chat = await Chat.findOne({
         _id: chatID,
         members: req.user?._id,
      }).populate("members", "profile _id email");
  
      if (!chat) {
         return next(createHttpError.NotFound("chat not found!"));
      }

      const person: any = chat?.members?.find((member) => member?._id.toString() !== req.user?._id.toString());

      const tsChat = Object.seal({
         _id: chat?._id,
         groupChat: chat?.groupChat,
         avatar: chat?.groupChat ? chat?.avatar : person?.profile?.avatar,
         name: chat?.groupChat ? chat?.name : `${person?.profile?.first_name} ${person?.profile?.last_name}`,
         about: chat?.groupChat ? chat?.about : person?.profile?.about,
         members: chat?.members,
         creator: chat?.groupChat ? chat.creator : req.user?._id,
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
