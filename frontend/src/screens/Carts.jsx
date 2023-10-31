import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinkContainer } from 'react-router-bootstrap';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Carts = () => {
   const [cartItems, setCartItems] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchCarts = async () => {
      try {
         const res = await axios.get('https://ecommerce-mern-t1pz.onrender.com/api/users/carts');
         return res.data;
      } catch (error) {
         console.error('Error fetching cart items:', error);
         return [];
      }
   };

   const deleteCartItem = async (id) => {
      try {
         await axios.delete(`https://ecommerce-mern-t1pz.onrender.com/api/users/carts/${id}`);
         const updatedCart = cartItems.filter((item) => item.id !== id);
         setCartItems(updatedCart);
         toast.warning("cart item deleted successfully")
      } catch (error) {
         console.error('Error deleting cart item:', error);
      }
   };

   useEffect(() => {
      const fetchCartData = async () => {
         const data = await fetchCarts();
         setCartItems(data);
         setLoading(false); 
      };

      fetchCartData();
   }, []);

   return (
      <section className='py-3'>
         <div className="flex justify-between text-base pb-10">
            <LinkContainer to="/products" className='hover:underline border-2 px-4 py-2 bg-gray-800 text-white rounded-lg'>
               <p>back to products</p>
            </LinkContainer>
            <h1 className='font-extrabold text-3xl'>Carts</h1>
         </div>
         <div>
            <div className='flex gap-4 flex-wrap items-center justify-center'>
               {loading && <Loader/>}
               {cartItems.length === 0 ? (
                  <p>No items in the cart</p>
               ) : (
                  cartItems.map((item) => (
                     <Card sx={{ maxWidth: 345 }} key={item.id}>
                        <CardMedia sx={{ height: 140 }} image={item.thumbnail} title="Thumbnail" />
                        <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                              {item.title}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              {item.description}
                           </Typography>
                        </CardContent>
                        <CardActions className='flex justify-between items-start'>
                           <p size="small" className='text-lg'>Price: {item.price}</p>
                           <div className="flex">
                              <Button size="small">Buy</Button>
                              <RiDeleteBinLine size={25} color='red' onClick={() => deleteCartItem(item.id)} className='cursor-pointer' />
                           </div>
                        </CardActions>
                     </Card>
                  ))
               )}
            </div>
         </div>
      </section>
   );
};

export default Carts;
