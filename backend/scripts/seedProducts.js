import mongoose from "mongoose";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import connectDB from "../config/mongodb.js";
import productModel from "../models/productModel.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Product = productModel;
const { v2 } = cloudinary;

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const imageFolder = path.join(__dirname, "../product-images");

const categories = ["Men", "Women", "Kids"];

const subCategories = [
  "Topwear",
  "Bottomwear",
  "Winterwear",
];

const sizesList = [
  ["S", "M", "L"],
  ["M", "L", "XL"],
  ["S", "M", "L", "XL"],
];

const names = [
  "Classic Cotton T Shirt",
  "Premium Hoodie",
  "Regular Fit Shirt",
  "Casual Jeans",
  "Printed Sweatshirt",
  "Slim Fit Trouser",
  "Denim Jacket",
  "Sports Wear",
  "Polo T Shirt",
  "Cargo Pant",
  "Formal Shirt",
  "Oversized Tee",
  "Winter Jacket",
  "Fashion Hoodie",
  "Comfort Shorts",
];

const description =
  "Premium quality clothing made with soft fabric for maximum comfort. Perfect for everyday wear with a modern and stylish design.";

const imageFiles = fs
  .readdirSync(imageFolder)
  .filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg")
  )
  .sort();

async function uploadImage(imagePath) {
  const result = await v2.uploader.upload(imagePath, {
    folder: "Forever-Ecommerce",
  });

  return result.secure_url;
}

async function seedProducts() {
  try {
    await connectDB();

    console.log("MongoDB Connected");

    await Product.deleteMany({});

    console.log("Old Products Deleted");

    for (let i = 0; i < imageFiles.length; i++) {
      console.log(`Uploading ${imageFiles[i]}...`);

      const imageUrl = await uploadImage(
        path.join(imageFolder, imageFiles[i])
      );

      const product = {
        name: `${names[i % names.length]} ${i + 1}`,
        description,
        price: Math.floor(Math.random() * 2000) + 499,
        image: [imageUrl],
        category: categories[i % categories.length],
        subCategory: subCategories[i % subCategories.length],
        sizes: sizesList[i % sizesList.length],
        bestseller: i % 5 === 0,
        date: Date.now(),
      };

      await Product.create(product);

      console.log(`✅ ${product.name} Added`);
    }

    console.log("=================================");
    console.log("🎉 ALL PRODUCTS ADDED SUCCESSFULLY");
    console.log("=================================");

    mongoose.connection.close();
    process.exit(0);

  } catch (err) {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedProducts();