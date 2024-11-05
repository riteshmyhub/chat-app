import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";

import GetChatDetailsController from "./chats/get-chat-details/get-chat-details.controller";
import GetMessagesController from "./messages/get-messages/get-messages.controller";

import GetChatsController from "./chats/get-chats/get-chats.controller";
import CreateChatController from "./chats/create-chat/create-chat.controller";
import DeleteChatController from "./chats/delete-chat/delete-chat.controller";
import DeleteMessagesController from "./messages/delete-messages/delete-messages.controller";
import AddMembersController from "./channel/add-members/add-members.controller";
import RemoveMemberController from "./channel/remove-member/remove-member.controller";

const router = Router();
router.use(AuthMiddleware);
router.get("/get-chats", GetChatsController);
router.get("/details-chat/:chatID", GetChatDetailsController);
router.post("/create-chat", CreateChatController);
router.delete("/delete-chat/:chatID", DeleteChatController);

// messages
router.get("/get-messages/:chatID", GetMessagesController);
router.delete("/delete-messages/:chatID", DeleteMessagesController);
// channel
router.post("/channel/add-members", AddMembersController);
router.delete("/channel/remove-member", RemoveMemberController);

const chatRoutes = router;
export default chatRoutes;
