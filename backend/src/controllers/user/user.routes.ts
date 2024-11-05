import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import SearchUserController from "./search-user/search-user.controller";
import UpdateProfileController from "./profile/update-profile.controller";
import SendRequestController from "./send-request/send-request.controller";
import GetRingtonesController from "./settings/get-ringtones/get-ringtones.controller";
import ChangeRingtoneController from "./settings/change-ringtone/change-ringtone.controller";

const router = Router();
router.use(AuthMiddleware);
router.get("/search", SearchUserController);
router.put("/profile", UpdateProfileController);
router.post("/send-request", SendRequestController);
router.get("/settings/get-ringtones", GetRingtonesController);
router.post("/settings/change-ringtone", ChangeRingtoneController);

const userRoutes = router;
export default userRoutes;
