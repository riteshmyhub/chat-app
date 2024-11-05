import mongoose from "mongoose";

const sendRequestSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
   },
   form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
   },
});

const SendRequest = mongoose.model("Request", sendRequestSchema);
export default SendRequest;
