import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ msg: "Runnig app testing..." });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
  dbConnect();
  console.log(`Server running on port https://localhost:${PORT}/`);
});
