import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/index.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
const uri = process.env.DATABASE_URL;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 menit
  max: 200, // maksimal 200 permintaan dalam jangka waktu yang ditentukan
  message: "Terlalu banyak permintaan dari IP Anda, silakan coba lagi nanti.",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(bodyParser.json());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(router);

app.listen(PORT, () => console.log("listening on port 3000"));
