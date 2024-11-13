import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Chat from "../../../../models/chat.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetContactsController(req: Req, res: Response, next: NextFunction) {
   try {
      const chat = await Chat.find({ members: req.user._id, groupChat: false }).populate("members", "profile _id email");

      const contacts = chat.map((chat) => {
         const person: any = chat?.members?.find((member) => member?._id.toString() !== req.user?._id.toString());
         return {
            _id: chat._id,
            about: person?.profile?.about,
            avatar: person?.profile?.avatar,
            name: `${person?.profile?.first_name} ${person?.profile?.last_name}`,
            members: chat.members,
            email: person?.email,
            creator: req.user?._id,
         };
      });
      res.status(200).json({
         success: true,
         data: { contacts },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
