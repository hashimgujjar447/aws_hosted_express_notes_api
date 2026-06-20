import { Router } from "express";

import {
  CreateNote,
  GetAllNotes,
  GetNote,
  UpdateNote,
  DeleteNote,
} from "./note.controller.js";

import { AuthMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(AuthMiddleware);

router.post("/", CreateNote);

router.get("/", GetAllNotes);

router.get("/:slug", GetNote);

router.patch("/:slug", UpdateNote);

router.delete("/:slug", DeleteNote);

export default router;
