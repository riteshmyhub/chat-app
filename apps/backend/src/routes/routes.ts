import { Router } from "express";
import chatRoutes from "../controllers/chat/chat.routes";
import userRoutes from "../controllers/user/user.routes";
import authRoutes from "../controllers/auth/auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

//
export default router;
