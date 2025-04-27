import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

// Serve static files from Frontend directory
app.use(express.static(path.resolve(__dirname, '../Frontend')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Serve Index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Frontend/Index.html'));
});

// Serve Index.html at /Frontend (optional, can be removed if not needed)
app.get('/Frontend', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Frontend/Index.html'));
});

app.listen(3000, () => console.log('🚀 Serveur sur http://localhost:3000'));
export { db };
