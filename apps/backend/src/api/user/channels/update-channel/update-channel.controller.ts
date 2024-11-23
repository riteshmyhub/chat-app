import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { bucket } from "../../../../libs/cloudinary";
import { SocketEmitter } from "../../../../socket/socket";
import Channel from "../../../../models/channel.model";

type ReqBody = { channelID: string; name: string; "members[]": string[]; about: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function UpdateChannelController(req: Req, res: Response, next: NextFunction) {
   try {
      const { channelID, name, about } = req.body;
      const avatar = req.files?.avatar;

      if (!channelID || !isValidObjectId(channelID)) {
         return next(createHttpError.BadRequest("Channel id is required or invaild"));
      }
      const channel = await Channel.findOne({ _id: channelID, groupChat: true });
      if (!channel) {
         return next(createHttpError.NotFound("Channel not found"));
      }
      if (channel?.admin?.toString() !== req.user?._id.toString()) {
         return next(createHttpError.BadRequest("You are not channel admin"));
      }
      if (name) channel.name = name;
      if (about) channel.about = about;
      if (avatar) {
         const options = {
            public_id: channel._id.toString(),
            folder: `users/${req.user?._id}/channels`,
         };
         const src = await bucket.uploadFile({ file: avatar, options });
         channel.avatar = src.secure_url;
      }
      await channel.save();
      SocketEmitter({ req: req, eventName: "REFRESH_CHANNEL", to: channel.members });
      res.status(201).json({
         success: true,
         data: {},
         message: "Channel details successfully updated!",
      });
   } catch (error) {
      console.log(error);
      next(createHttpError.InternalServerError());
   }
}
