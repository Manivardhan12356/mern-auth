import express from 'express';  // Import the 'express' module
import asyncHandler from 'express-async-handler';
import data from '../config/JSON/data.json' assert { type: 'json' };


const app = express();  // Create an Express.js app

const productsData = asyncHandler(async (req, res) => {
   return res.json(data);  // Send JSON data
});


export {productsData}