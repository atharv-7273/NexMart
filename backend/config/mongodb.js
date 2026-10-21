import mongoose from "mongoose";

const connectDB = async () => {

  try {

    mongoose.connection.on('connected', () => {
      console.log("DB Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerceDB`);

  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }

}

export default connectDB;