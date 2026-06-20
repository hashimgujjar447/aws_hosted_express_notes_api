import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDb from "./lib/db/config.js";

import notesRouter from "./modules/notes/note.route.js";
import authRouter from "./modules/auth/auth.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Notes API Running updating using CI CD",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

async function init() {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`App is listening on port and it is version 2 ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
