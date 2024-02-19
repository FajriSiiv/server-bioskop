import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/index.js";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
const uri = process.env.DATABASE_URL;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(router);

app.listen(PORT, () => console.log("listening on port 3000"));
