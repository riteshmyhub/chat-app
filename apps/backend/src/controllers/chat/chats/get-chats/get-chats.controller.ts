import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Chat from "../../../../models/chat.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetChatsController(req: Req, res: Response, next: NextFunction) {
   try {
      const chats = await Chat.find({ members: req.user._id }).populate("members", "profile _id email");

      const mapChats = chats?.map((chat) => {
         const person: any = chat?.members?.find((member) => member?._id.toString() !== req.user?._id.toString());

         return {
            _id: chat._id,
            groupChat: chat.groupChat,
            avatar: chat.groupChat ? chat.avatar : person?.profile?.avatar,
            name: chat.groupChat ? chat.name : `${person?.profile?.first_name} ${person?.profile?.last_name}`,
            about: chat.groupChat ? chat?.about : person?.profile?.about,
            members: chat.members,
            creator: chat.groupChat ? chat.creator : req.user?._id,
         };
      });

      res.status(200).json({
         success: true,
         data: {
            chats: mapChats,
         },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
