import mongoose, { Document } from "mongoose";

interface IChatSchema extends Document {
   name: string;
   groupChat: boolean;
   creator: mongoose.Schema.Types.ObjectId;
   members: mongoose.Schema.Types.ObjectId[];
}

const chatSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: function (this: IChatSchema) {
            return this.groupChat;
         },
      },
      groupChat: {
         type: Boolean,
         required: true,
      },
      avatar: {
         type: String,
      },
      creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      about: {
         type: String,
         required: function (this: IChatSchema) {
            return this.groupChat;
         },
      },
      members: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
      ],
   },
   { timestamps: true }
);
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
