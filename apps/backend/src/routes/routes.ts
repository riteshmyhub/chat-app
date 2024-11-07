import { Router } from "express";
import LoginController from "../api/auth/login/login.controller";
import LogoutController from "../api/auth/logout/logout.controller";
import RegisterController from "../api/auth/register/register.controller";
import SessionController from "../api/auth/session/session.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use("/auth", function () {
   router.post("/login", LoginController);
   router.post("/register", RegisterController);
   router.get("/logout",[AuthMiddleware], LogoutController);
   router.get("/session",[AuthMiddleware], SessionController);
   return router;
}());

router.use("/user", function () {});
router.use("/chat", function () {});

//
export default router;
