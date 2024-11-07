import mongoose from "mongoose";

const soundSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   src: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      enum: ["notification", "send", "received"],
      required: true,
   },
});

const Sound = mongoose.model("Sound", soundSchema);
export default Sound;
