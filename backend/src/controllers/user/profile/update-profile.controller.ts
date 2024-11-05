import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import User from "../../../models/user.model";
import { bucket } from "../../../libs/cloudinary";

type ReqBody = { first_name: string; last_name: string; about: string; avatar: any };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function UpdateProfileController(req: Req, res: Response, next: NextFunction) {
   try {
      const { first_name, last_name, about } = req.body;
      const updateFields: any = {};
      if (first_name) updateFields["profile.first_name"] = first_name;
      if (last_name) updateFields["profile.last_name"] = last_name;
      if (about) updateFields["profile.about"] = about;
      const avatar: any = req.files?.avatar;
      if (avatar) {
         const src = await bucket.uploadFile({
            file: avatar,
            options: {
               public_id: req.user?._id,
               folder: `users/${req.user?._id}`,
            },
         });
         updateFields["profile.avatar"] = src.secure_url;
      }
      const user = await User.findByIdAndUpdate(
         req.user?._id,
         { $set: updateFields },
         {
            new: true,
            runValidators: true,
         }
      );

      res.status(201).json({
         message: "Profile updated successfully",
         data: { profile: user?.profile },
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
