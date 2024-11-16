import mongoose, { Document, Types } from "mongoose";
import { genSalt, hash } from "bcrypt";

const useSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, "Email in required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email"],
   },
   fcm_token: {
      type: String,
      select: false,
   },

   password: {
      type: String,
      required: [true, "Password in required."],
      trim: true,
      select: false,
   },
   profile: {
      avatar: {
         type: String,
      },
      first_name: {
         type: String,
      },
      last_name: {
         type: String,
      },
      about: {
         type: String,
      },
   },
   contacts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   setting: {
      theme: {
         type: String,
         default: "#27A6E6",
      },
      pin: {
         type: String,
      },
      notification_sound: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Sound",
      },
      received_message_sound: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Sound",
      },
      send_message_sound: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Sound",
      },
   },
   isSetup: {
      type: Boolean,
      default: false,
   },
   last_seen: {
      type: String,
   },
});

useSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      // Ensure password is hashed only when modified
      const salt = await genSalt();
      this.password = await hash(this.password, salt);
   }
   next();
});

const User = mongoose.model("User", useSchema);
export default User;
