import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import LoginController from "./login/login.controller";
import RegisterController from "./register/register.controller";
import LogoutController from "./logout/logout.controller";
import GetSessionController from "./session/get-session.controller";

const router = Router();
router.post("/login", LoginController);
router.post("/register", RegisterController);
if (process.env.AUTH_MODE === "HTTP_COOKIE") {
   router.get("/logout", [AuthMiddleware], LogoutController);
}
router.get("/session", [AuthMiddleware], GetSessionController);

const authRoutes = router;
export default authRoutes;
