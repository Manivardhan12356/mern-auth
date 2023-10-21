import express from 'express';
import { authUser, updateUserProfile, gettUserProfile, registerUser, LogutUser } from '../controllers/userController.js';
import { protect } from '../controllers/authMiddleware.js';
const router = express.Router();


router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', LogutUser);
router.route('/profile').get(protect,gettUserProfile).put(protect,updateUserProfile);


export default router;