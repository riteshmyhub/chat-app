import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import User from "../../../../models/user.model";
import { SocketEmitter } from "../../../../socket/socket";

type ReqBody = {};

type ReqQuery = {};

type ReqParms = { id: string };

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function DeleteContactController(req: Req, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const user = await User.findById(req.user._id);
      if (!user) {
         return next(createHttpError.InternalServerError());
      }
      const contacts: any = user?.contacts?.filter((contact) => contact?.chatID !== id);
      user.contacts = contacts;
      await user.save();
      SocketEmitter({
         req,
         eventName: "refresh_contacts",
         to: [req.user._id],
      });
      res.status(200).json({
         message: "Contact deleted successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
