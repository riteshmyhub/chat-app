import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../../models/user.model";
import { bucket } from "../../../../libs/cloudinary";
import { isValidObjectId } from "mongoose";
import { SocketEmitter } from "../../../../socket/socket";
import Chat from "../../../../models/chat.model";

type ReqBody = { name: string; "members[]": string[]; about: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function CreateChannelController(req: Req, res: Response, next: NextFunction) {
   try {
      const { name, about } = req.body;
      const members = Array.isArray(req.body["members[]"]) ? req.body["members[]"] : [req.body["members[]"]];
      if (!name) {
         return next(createHttpError.BadRequest("Channel name is required"));
      }
      if (!about) {
         return next(createHttpError.BadRequest("about field is required"));
      }
      if (!members?.length) {
         return next(createHttpError.BadRequest("Not added members"));
      }
      if (members?.some((member) => !isValidObjectId(String(member))) || members.includes(req?.user?._id?.toString())) {
         return next(createHttpError.BadRequest("invalid members id found"));
      }
      const vaildMembers = await User.find({ _id: { $in: members } });
      if (!vaildMembers?.length) {
         return next(createHttpError.BadRequest("Member not found id!"));
      }
      const membersWithReqUser = [...members, req?.user?._id?.toString()];

      const newChannel = await new Chat({
         name: name,
         groupChat: true,
         creator: req?.user?._id,
         members: membersWithReqUser,
         about: about,
      }).save();

      const avatar = req.files?.avatar;
      const src = avatar
         ? await bucket.uploadFile({
              file: avatar,
              options: {
                 public_id: newChannel._id.toString(),
                 folder: `users/${req.user?._id}/channels`,
              },
           })
         : null;

      newChannel.avatar = src?.secure_url;
      await newChannel.save();

      SocketEmitter({ req: req, eventName: "REFRESH_CHANNEL", to: membersWithReqUser });
      SocketEmitter({
         req: req,
         eventName: "ALERT",
         to: membersWithReqUser,
         data: {
            title: "You've Been Added to a New Channel!",
            description: `Welcome to ${name} channel`,
            action: `/channels/${newChannel._id}`,
         },
      });

      res.status(201).json({
         success: true,
         data: {},
         message: "channel successfully created",
      });
   } catch (error) {
      console.log(error);
      next(createHttpError.InternalServerError());
   }
}
