import express from 'express';
import { authUser, updateUserProfile, gettUserProfile, registerUser, LogutUser } from '../controllers/userController.js';
import { protect } from '../controllers/authMiddleware.js';
import { productsData } from '../controllers/productsController.js';
import { CartsController, deleteCartItem, getCartItems } from '../controllers/CartsController.js';
const router = express.Router();


router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', LogutUser);
router.route('/profile').get(protect, gettUserProfile).put(protect, updateUserProfile);
router.get('/products', productsData);
router.route('/carts').post(CartsController).get(getCartItems)
router.delete('/carts/:id',deleteCartItem);


export default router;