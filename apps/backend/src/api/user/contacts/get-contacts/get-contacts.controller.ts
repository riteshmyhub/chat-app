import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../../../../models/user.model";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetContactsController(req: Req, res: Response, next: NextFunction) {
   try {
      const user = await User.findById(req.user._id).populate("contacts.person", "profile _id email");

      const contacts = user?.contacts?.map((contact: any) => ({
         _id: contact?.person?._id,
         chatID: contact?.chatID,
         about: contact?.person?.profile?.about,
         avatar: contact?.person?.profile?.avatar,
         name: `${contact?.person?.profile?.first_name} ${contact?.person?.profile?.last_name}`,
         email: contact?.person?.email,
      }));

      res.status(200).json({
         success: true,
         data: { contacts },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
