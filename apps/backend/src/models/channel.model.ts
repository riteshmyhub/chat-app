import mongoose, { Document } from "mongoose";

const channelSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
      },
      admin: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      about: {
         type: String,
         required: true,
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
const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
