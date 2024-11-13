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
import DeleteContactController from "../api/user/contacts/delete-contact/delete-contact.controller";
import CreateChannelController from "../api/user/channels/create-channel/create-channel.controller";
import GetChannelsController from "../api/user/channels/get-channels/get-channels.controller";
import UpdateChannelController from "../api/user/channels/update-channel/update-channel.controller";
import AddMembersController from "../api/user/channels/add-member/add-member.controller";
import RemoveMemberController from "../api/user/channels/remove-member/remove-member.controller";
import GetChatDetailsController from "../api/chat/get-chat-details/get-chat-details.controller";

const router = Router();

router.use(
   "/auth",
   (function () {
      router.post("/login", LoginController);
      router.post("/register", RegisterController);
      router.get("/logout", [AuthMiddleware], LogoutController);
      router.get("/session", [AuthMiddleware], SessionController);
      return router;
   })()
);

router.use(
   "/user",
   (function () {
      router.put("/profile", [AuthMiddleware], UpdateProfileController);
      router.get("/search", [AuthMiddleware], SearchUserController);
      router.get("/get-contacts", [AuthMiddleware], GetContactsController);
      router.post("/add-contact", [AuthMiddleware], AddContactController);
      router.delete("/delete-contact/:id", [AuthMiddleware], DeleteContactController);
      router.post("/create-channel", [AuthMiddleware], CreateChannelController);
      router.get("/get-channels", [AuthMiddleware], GetChannelsController);
      router.put("/update-channel", [AuthMiddleware], UpdateChannelController);
      router.put("/add-members", [AuthMiddleware], AddMembersController);
      router.delete("/remove-member", [AuthMiddleware], RemoveMemberController);
      return router;
   })()
);

router.use(
   "/chat",
   (function () {
      router.get("/chat-details/:id", [AuthMiddleware], GetChatDetailsController);
      return router;
   })()
);

//
export default router;
