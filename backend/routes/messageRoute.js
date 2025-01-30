import express from 'express';
import {  getMessage, sendMessage,editMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage)
router.route("/:id").get(isAuthenticated,getMessage)
router.route('/editMessage/:id').put(isAuthenticated,editMessage)


export default router