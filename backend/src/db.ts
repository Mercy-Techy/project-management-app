import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(String(process.env.MONGOOSE_URI));
  } catch (error) {
    console.log(error);
  }
};
