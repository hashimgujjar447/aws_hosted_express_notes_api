import { Router } from "express";
import { Register, Login, Logout } from "./auth.controller.js";

import { AuthMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", AuthMiddleware, Logout);

export default router;
