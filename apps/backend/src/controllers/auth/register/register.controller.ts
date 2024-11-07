import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import User from "../../../models/user.model";

type ReqBody = { email: string; password: string; confirmPassword: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function RegisterController(req: Req, res: Response, next: NextFunction) {
   try {
      const { email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
         return next(createHttpError.BadRequest("password and confirm password in match!"));
      }
      const user = await User.findOne({ email });
      if (user) {
         return next(createHttpError.BadRequest("email already exists!"));
      }
      await User.create({ email, password });
      res.status(200).json({
         message: "Register successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
