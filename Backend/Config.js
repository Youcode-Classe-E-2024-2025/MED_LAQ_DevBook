import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";
import bookRoutes from "./route/bookRoutes.js";
import { initializeBookController } from "./controllers/bookController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../Frontend")));

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to the database");

  initializeBookController(db);

  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error executing test query:", err.message);
    } else {
      console.log("Database tables:", results);
    }
  });
});

app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/Index.html"));
});

app.use((req, res) => {
  console.error(`Invalid route accessed: ${req.method} ${req.url}`);
  res.status(404).json({ error: true, message: "Route not found" });
});

app.listen(3000, () => console.log("🚀 Serveur sur http://localhost:3000"));
