import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
   {
      userID: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      title: {
         type: String,
         required: true,
      },
      body: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
