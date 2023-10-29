import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

const CartsController = asyncHandler(async (req, res) => {
   const { id, thumbnail, title, description, price } = req.body;
   const cartItem = await Cart.create({
      id,
      thumbnail,
      title,
      description,
      price,
   });

   const savedCartItem = await cartItem.save();

   if (savedCartItem) {
      res.status(201).json(savedCartItem);
   } else {
      res.status(400);
      throw new Error(`Invalid data`);
   }
});

const getCartItems = asyncHandler(async (req, res) => {
   const cartItems = await Cart.find();
   res.json(cartItems);
});

const deleteCartItem = asyncHandler(async (req, res) => {
   const cartItemId = req.params.id;

   const cartItem = await Cart.findOneAndRemove({ id: cartItemId });

   if (cartItem) {
      res.json({ message: 'Cart item removed' });
   } else {
      res.status(404);
      throw new Error('Cart item not found');
   }
});

export { CartsController, getCartItems, deleteCartItem };
