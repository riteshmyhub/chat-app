import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import User from "../../../models/user.model";

type ReqBody = { name: string; members: string[] };

type ReqQuery = {
   search: string;
};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function SearchUserController(req: Req, res: Response, next: NextFunction) {
   try {
      const search = req?.query?.search.trim();

      const contacts = await User.find({
         $and: [
            { _id: { $ne: req?.user?._id } },
            {
               $or: [
                  { "profile.first_name": { $regex: search, $options: "i" } }, //
                  { "profile.last_name": { $regex: search, $options: "i" } },
               ],
            },
         ],
      });
      res.status(200).json({
         message: "contact successfully fatched",
         data: { contacts },
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
