const products = require("../data/product.json");
const Product = require("../models/productModel");
const dotenv = require("dotenv");
const connectDB = require("../config/database");

dotenv.config({ path: "Server/config/config.env" });
connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Data deleted!");
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit(1);
  } catch (erorr) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

seedProducts();
