import { Router } from "express";
import LoginController from "../api/auth/login/login.controller";
import LogoutController from "../api/auth/logout/logout.controller";
import RegisterController from "../api/auth/register/register.controller";
import SessionController from "../api/auth/session/session.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import UpdateProfileController from "../api/user/profile/update-profile.controller";
import SearchUserController from "../api/user/search/search-user.controller";
import GetContactsController from "../api/user/contacts/get-contacts/get-contacts.controller";
import AddContactController from "../api/user/contacts/add-contact/add-contact.controller";
import GetContactDetailsController from "../api/user/contacts/get-contact-details/get-contact-details.controller";
import DeleteContactController from "../api/user/contacts/delete-contact/delete-contact.controller";

const router = Router();

router.use("/auth", function () {
   router.post("/login", LoginController);
   router.post("/register", RegisterController);
   router.get("/logout", [AuthMiddleware], LogoutController);
   router.get("/session", [AuthMiddleware], SessionController);
   return router;
}());

router.use("/user", function () {
   router.put("/profile",[AuthMiddleware], UpdateProfileController);
   router.get("/search", [AuthMiddleware], SearchUserController);
   router.get("/get-contacts", [AuthMiddleware], GetContactsController);
   router.get("/get-contacts/:id", [AuthMiddleware], GetContactDetailsController);
   router.post("/add-contact", [AuthMiddleware], AddContactController);
   router.delete("/delete-contact/:id", [AuthMiddleware], DeleteContactController);
   return router;
}());
router.use("/chat", function () {});

//
export default router;
