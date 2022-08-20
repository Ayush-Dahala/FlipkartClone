import React from "react";
import { Product } from "./Schema.js";
import { products } from "./data.js ";

const defaultData = async () => {
  try {
    // await Product.deleteMany({})
    await Product.insertMany(products);
    console.log("data inserted");
  } catch (error) {
    console.log("error while inserting data", error);
  }
};

export default defaultData;
