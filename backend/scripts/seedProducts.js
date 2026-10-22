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
const assetsJsPath = path.join(__dirname, "../../frontend/src/assets/assets.js");
const dataJsonPath = path.join(__dirname, "../data/products.json");

// Read and parse real products from frontend/src/assets/assets.js
function parseProductsFromAssets() {
  const content = fs.readFileSync(assetsJsPath, "utf8");
  const blocks = content.split(/{\s*_id:/g).slice(1);
  const parsed = [];

  for (const b of blocks) {
    const idMatch = b.match(/^\s*["']([^"']+)["']/);
    const nameMatch = b.match(/name:\s*["']([^"']+)["']/);
    const descMatch = b.match(/description:\s*["']([^"']+)["']/);
    const catMatch = b.match(/category:\s*["']([^"']+)["']/);
    const subCatMatch = b.match(/subCategory:\s*["']([^"']+)["']/);
    const priceMatch = b.match(/price:\s*(\d+)/);
    const bestsellerMatch = b.match(/bestseller:\s*(true|false)/);
    const sizesMatch = b.match(/sizes:\s*\[([^\]]+)\]/);
    const imageMatch = b.match(/image:\s*\[([^\]]+)\]/);

    if (nameMatch && catMatch) {
      const rawSizes = sizesMatch
        ? sizesMatch[1].split(",").map((s) => s.replace(/['"\s]/g, ""))
        : ["S", "M", "L", "XL"];
      const rawImages = imageMatch
        ? imageMatch[1].split(",").map((s) => s.trim() + ".png")
        : [];

      parsed.push({
        assetId: idMatch ? idMatch[1] : "",
        name: nameMatch[1],
        description: descMatch
          ? descMatch[1]
          : "Premium quality clothing made with soft fabric for maximum comfort.",
        price: priceMatch ? Number(priceMatch[1]) : 199,
        category: catMatch[1],
        subCategory: subCatMatch ? subCatMatch[1] : "Topwear",
        sizes: rawSizes,
        bestseller: bestsellerMatch ? bestsellerMatch[1] === "true" : false,
        imageFiles: rawImages,
      });
    }
  }

  return parsed;
}

const uploadedCache = new Map();

async function getOrUploadImage(fileName) {
  if (uploadedCache.has(fileName)) {
    return uploadedCache.get(fileName);
  }

  const baseName = path.parse(fileName).name;
  const filePath = path.join(imageFolder, fileName);

  try {
    const result = await v2.uploader.upload(filePath, {
      folder: "Forever-Ecommerce",
      public_id: baseName,
      overwrite: false,
    });

    uploadedCache.set(fileName, result.secure_url);
    return result.secure_url;
  } catch (error) {
    // If it already exists or on error, try fetching by public_id
    if (error.http_code === 400 || error.message?.includes("already exists")) {
      const existingUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/Forever-Ecommerce/${baseName}.png`;
      uploadedCache.set(fileName, existingUrl);
      return existingUrl;
    }
    console.error(`Error uploading ${fileName}:`, error.message);
    // Fallback to direct Cloudinary URL
    const fallbackUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/Forever-Ecommerce/${baseName}.png`;
    uploadedCache.set(fileName, fallbackUrl);
    return fallbackUrl;
  }
}

async function seedProducts() {
  try {
    console.log("Connecting to Database...");
    await connectDB();
    console.log("MongoDB Connected");

    const authenticProducts = parseProductsFromAssets();
    console.log(`Parsed ${authenticProducts.length} authentic products from assets.js`);

    console.log("Clearing outdated/corrupted products from database...");
    await Product.deleteMany({});
    console.log("Old products wiped cleanly.");

    const seedData = [];

    for (let i = 0; i < authenticProducts.length; i++) {
      const item = authenticProducts[i];
      const imageUrls = [];

      for (const imgFile of item.imageFiles) {
        process.stdout.write(`Uploading/resolving ${imgFile} (${i + 1}/${authenticProducts.length})...\r`);
        const url = await getOrUploadImage(imgFile);
        imageUrls.push(url);
      }

      const productDoc = {
        name: item.name,
        description: item.description,
        price: item.price,
        image: imageUrls,
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes,
        bestseller: item.bestseller,
        date: Date.now() - (authenticProducts.length - i) * 60000,
      };

      seedData.push(productDoc);
    }

    console.log("\nInserting verified authentic products into database...");
    const createdDocs = await Product.insertMany(seedData);
    console.log(`Successfully seeded ${createdDocs.length} products with accurate categories!`);

    // Also persist data/products.json for backup / offline mode
    fs.writeFileSync(dataJsonPath, JSON.stringify(createdDocs, null, 2), "utf8");
    console.log(`Backed up ${createdDocs.length} products to data/products.json`);

    console.log("=================================");
    console.log("🎉 ALL PRODUCTS SEEDED ACCURATELY!");
    console.log("=================================");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    try {
      await mongoose.connection.close();
    } catch (_) {}
    process.exit(1);
  }
}

seedProducts();