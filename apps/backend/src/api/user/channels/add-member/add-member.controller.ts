import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId, Types } from "mongoose";
import { duplicateFinder } from "../../../../pipes";
import User from "../../../../models/user.model";
import { SocketEmitter } from "../../../../socket/socket";
import Chat from "../../../../models/chat.model";

type ReqBody = { channelID: string; members: string[] };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function AddMembersController(req: Req, res: Response, next: NextFunction) {
   try {
      const { channelID, members } = req.body;

      if (!channelID || !isValidObjectId(channelID)) {
         return next(createHttpError.BadRequest("channelID ion  requird or invaild"));
      }
      if (!members?.length) {
         return next(createHttpError.BadRequest("please add members"));
      }
      if (members?.some((member) => !isValidObjectId(String(member)))) {
         return next(createHttpError.BadRequest("invalid members id found"));
      }
      const isDuplicateMember = duplicateFinder(members);
      if (isDuplicateMember) {
         return next(createHttpError.BadRequest("Duplicate member ID found."));
      }
      const channel = await Chat.findOne({ _id: channelID, groupChat: true }).populate("members", "profile _id email");

      if (!channel) {
         return next(createHttpError.NotFound("Channel not found"));
      }
      if (channel.members.some((member) => members.includes(member._id?.toString()))) {
         return next(createHttpError.BadRequest("One or more members are already part of this channel"));
      }
      const vaildMembers = await User.find({ _id: { $in: members } });
      if (!vaildMembers?.length) {
         return next(createHttpError.BadRequest("Member not found id!"));
      }
      channel.members = [...channel.members, ...members] as Types.ObjectId[];
      await channel.save();
      SocketEmitter({ req: req, eventName: "REFRESH_CHANNEL", to: channel.members });
      const updatedChannel = await channel.populate("members", "profile _id email");

      res.status(201).json({
         success: true,
         data: {
            members: updatedChannel?.members,
         },
         message: "Members successfully added",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
