import mongoose from "mongoose";

const connect2DB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log(`Database successfully connected 👍`);
   } catch (error) {
      console.log("datasbase error : ", error);
   }
};
connect2DB();
