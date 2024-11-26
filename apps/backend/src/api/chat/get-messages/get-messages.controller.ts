import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { firebaseDB } from "../../../firebase/firebase-admin-app";
type ReqBody = {};

type ReqQuery = {};

type ReqParms = {
   id: string;
};

type Req = Request<ReqParms, {}, ReqBody, ReqQuery>;

export default async function GetMessagesController(req: Req, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      const messagesRef = await firebaseDB.collection("messages");
      const querySnapshot = await messagesRef.where("chat", "==", id).orderBy("createdAt").get();
      const messages = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         _id: doc.id,
      }));

      const unreadMessagesIds: any[] = [];

      const batch = firebaseDB.batch();
      querySnapshot.forEach((doc) => {
         const data = doc.data();
         messages.push({ ...data, _id: doc.id });
         if (Object.keys(data).includes("seen") && !data.seen && !data.groupChat) {
            unreadMessagesIds.push({ _id: doc.id });
            batch.update(doc.ref, { seen: true });
         }
      });

      res.status(200).json({
         success: true,
         data: { messages },
         message: "successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError());
   }
}
