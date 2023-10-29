import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   id: {
      type: String,
      required: true
  },
   thumbnail: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: String,
      required: true
   },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;