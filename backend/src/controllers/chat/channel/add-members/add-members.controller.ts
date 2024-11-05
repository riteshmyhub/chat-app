import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId, Types } from "mongoose";
import Chat from "../../../../models/chat.model";
import User from "../../../../models/user.model";
import { SocketEmitter } from "../../../../socket/socket";

type ReqBody = {
   chatID: string;
   members: string[];
};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function AddMembersController(req: Req, res: Response, next: NextFunction) {
   try {
      const { chatID, members } = req.body;

      if (!chatID || !isValidObjectId(chatID)) {
         return next(createHttpError.BadRequest("chatID required or invalid id!"));
      }

      if (!Array.isArray(members)) {
         return next(createHttpError.BadRequest("invalid input or members required"));
      }

      if (!members?.length) {
         return next(createHttpError.BadRequest("please add members"));
      }

      let tempID = "";
      members.forEach((element) => {
         if (element === tempID) {
            return next(createHttpError.BadRequest("Duplicate member ID found."));
         }
         tempID += element;
      });

      if (members.some((id) => !isValidObjectId(id))) {
         return next(createHttpError.BadRequest("invalid id in members list!"));
      }

      const chat = await Chat.findById(chatID).populate("members", "profile.first_name profile.last_name");

      if (!chat) {
         return next(createHttpError.NotFound("Chat Found Not Found"));
      }

      if (!chat?.groupChat) {
         return next(createHttpError.BadRequest("Not a group Chat!"));
      }
      if (chat.creator?.toString() !== req?.user?._id?.toString()) {
         return next(createHttpError.BadRequest("you are not allowed to add members!"));
      }
      const users = await User.find() //
         .select("profile.first_name profile.last_name");

      const isDBMembers = members.every((id) => users.find((x) => x._id.toString() === id.toString()));
      if (!isDBMembers) {
         return next(createHttpError.NotFound("Some members not found!"));
      }

      const isDuplicateMember = chat.members.some((user) => members.includes(user._id.toString()));

      if (isDuplicateMember) {
         return next(createHttpError.BadRequest("One or more members are already part of this chat."));
      }
      chat.members = [...chat.members, ...members] as Types.ObjectId[];

      await chat.save();
      const membersWithName = users
         .filter((user) => members.includes(user?._id.toString()))
         .map((u) => `${u.profile?.first_name} ${u.profile?.last_name}`)
         .join(",");

      SocketEmitter({
         req: req,
         eventName: "ALERT",
         to: chat.members,
         data: {
            title: "Notification",
            description: `${membersWithName} added in ${chat.name} channel`,
            action: null,
         },
      });

      SocketEmitter({
         req: req,
         eventName: "REFRESH_CHATS",
         to: members,
      });

      res.status(200).json({
         message: "Members successfully added",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
