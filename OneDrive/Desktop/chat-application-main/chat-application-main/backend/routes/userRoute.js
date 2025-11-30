import express from 'express';
import { getOtherUsers, logOut, login, register } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/").get(isAuthenticated , getOtherUsers);

export default router;