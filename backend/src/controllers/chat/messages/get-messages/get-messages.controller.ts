import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Message from "../../../../models/message.model";

type ReqBody = {};

type ReqQuery = {
   page: number;
};

type ReqParms = {
   chatID: string;
};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetMessagesController(req: Req, res: Response, next: NextFunction) {
   try {
      const { chatID } = req.params;

      const messages = await Message.find({ chat: chatID })
         .sort({ timestamp: 1 }) //
         .populate("sender", "profile.avatar profile.first_name profile.last_name");

      res.status(200).json({
         message: "Messages successfully fetched",
         data: { messages },
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
