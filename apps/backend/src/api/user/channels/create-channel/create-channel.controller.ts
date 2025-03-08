import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { bucket } from "../../../../libs/cloudinary";
import Channel from "../../../../models/channel.model";

type ReqBody = { name: string; "members[]": string[]; about: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function CreateChannelController(req: Req, res: Response, next: NextFunction) {
   try {
      const { name, about } = req.body;
      if (!name) {
         return next(createHttpError.BadRequest("Channel name is required"));
      }
      if (!about) {
         return next(createHttpError.BadRequest("about field is required"));
      }
      const membersWithReqUser = [req?.user?._id?.toString()];

      const newChannel = await new Channel({
         name: name,
         admin: req?.user?._id,
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
      res.status(201).json({
         success: true,
         data: {},
         message: "channel successfully created",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
