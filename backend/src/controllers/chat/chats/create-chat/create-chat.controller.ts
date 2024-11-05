import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { duplicateFinder } from "../../../../utils/pipes";
import Chat from "../../../../models/chat.model";
import { SocketEmitter } from "../../../../socket/socket";
import { bucket } from "../../../../libs/cloudinary";

type ReqBody = { isGroupChat: string; "members[]": string[]; name: string; person: string; about: string };

type ReqQuery = {};

type ReqParms = {};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function CreateChatController(req: Req, res: Response, next: NextFunction) {
   try {
      const { name, isGroupChat, person, about } = req.body;
      const members = Array.isArray(req.body["members[]"]) ? req.body["members[]"] : [req.body["members[]"]];
      const avatar = req.files?.avatar;
      if (!isGroupChat) {
         return next(createHttpError.BadRequest("isGroupChat field is required"));
      }
      const isGroup = isGroupChat === "true";

      // for group chat
      if (isGroup) {
         if (!name) {
            return next(createHttpError.BadRequest("Group name field is required"));
         }
         if (!about) {
            return next(createHttpError.BadRequest("about field is required"));
         }
         if (!members?.length) {
            return next(createHttpError.BadRequest("Not added members"));
         }
         // if (members?.length < 2) {
         //    return next(createHttpError.BadRequest("min 2 members required"));
         // }
         if (members?.some((member) => !isValidObjectId(String(member)))) {
            return next(createHttpError.BadRequest("invalid members id found"));
         }
         if (duplicateFinder(members)) {
            return next(createHttpError.BadRequest("Duplicate member ID found."));
         }
         const membersWithReqUser = [...members, req?.user?._id];

         const newChat = await new Chat({
            name: name,
            groupChat: isGroup,
            creator: req?.user?._id,
            members: membersWithReqUser,
            about: about,
         }).save();

         const src = avatar
            ? await bucket.uploadFile({
                 file: avatar,
                 options: {
                    public_id: newChat._id.toString(),
                    folder: `users/${req.user?._id}/channels`,
                 },
              })
            : null;

         newChat.avatar = src?.secure_url;
         await newChat.save();

         SocketEmitter({
            req: req,
            eventName: "ALERT",
            to: membersWithReqUser,
            data: {
               title: "You've Been Added to a New Channel!",
               description: `Welcome to ${name} channel`,
               action: `/chat/${newChat._id}`,
            },
         });

         SocketEmitter({
            req: req,
            eventName: "REFRESH_CHATS",
            to: membersWithReqUser,
         });

         return res.status(200).json({
            message: "group successfully created",
            data: {},
            success: true,
         });
      }
      // for person chat
      if (!person) {
         return next(createHttpError.BadRequest("person field is required"));
      }
      if (!isValidObjectId(person)) {
         return next(createHttpError.BadRequest("invalid person id"));
      }
      const personWithAuthUser = [person, req?.user?._id];

      const oneToOneChat = await new Chat({
         groupChat: false,
         creator: req?.user?._id,
         members: personWithAuthUser,
      });
      await oneToOneChat.save();

      SocketEmitter({
         req: req,
         eventName: "REFRESH_CHATS",
         to: personWithAuthUser,
      });

      SocketEmitter({
         req: req,
         eventName: "ALERT",
         to: [person],
         data: {
            title: "New Chat Member Added!",
            description: `${req?.user?.profile?.first_name} ${req?.user?.profile?.last_name} has been added to your chat.`,
            action: `/chat/${oneToOneChat._id}`,
         },
      });

      res.status(200).json({
         message: `contact in your chats successfully`,
         data: {},
         success: true,
      });
   } catch (error) {
      console.log(error);

      next(createHttpError.InternalServerError());
   }
}
