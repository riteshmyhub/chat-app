import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Channel from "../../../../models/channel.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetChannelsController(req: Req, res: Response, next: NextFunction) {
   try {
      const channels = await Channel.find({ members: req?.user?._id }).populate("members", "profile _id email");

      res.status(201).json({
         success: true,
         data: {
            channels: channels,
         },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
