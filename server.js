import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import scraperRouter from "./routes/scraperRoutes.js";
import { scrapeStoriesService } from "./services/scraperService.js";
import storyRouter from "./routes/storyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api",scraperRouter);
app.use("/api/stories",storyRouter);

app.get("/", (req, res) => {
  res.send({ msg: "Runnig app testing..." });
});

const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await dbConnect();

    console.log("DB Connected successfully");

    app.listen(PORT, async () => {
      console.log(`Server running on http://localhost:${PORT}`);

      await scrapeStoriesService();
    });

  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();