import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import scraperRouter from "./routes/scraperRoutes.js";
import { scrapeStoriesService } from "./services/scraperService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api",scraperRouter);

app.get("/", (req, res) => {
  res.send({ msg: "Runnig app testing..." });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
dbConnect().then(async () => {
   await scrapeStoriesService();
});
  console.log(`Server running on port http://localhost:${PORT}/`);
});
