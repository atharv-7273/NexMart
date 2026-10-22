import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });

    let uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    // If URI does not specify a database and does not have query params, append /ecommerceDB
    if (!uri.includes("mongodb+srv://") && !uri.endsWith("/ecommerceDB") && !uri.includes("?")) {
      uri = `${uri.replace(/\/+$/, "")}/ecommerceDB`;
    }

    await mongoose.connect(uri);
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;