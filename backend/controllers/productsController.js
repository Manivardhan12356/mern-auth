import express from 'express';
import asyncHandler from 'express-async-handler';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../config/JSON/data.json');

const app = express();

const productsData = asyncHandler(async (req, res) => {
   try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const jsonData = JSON.parse(data);
      return res.json({ data: jsonData });
   } catch (error) {
      console.error('Error reading or parsing JSON:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
   }
});

export { productsData };
