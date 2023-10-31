import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, } from '../slices/PoductsData'; // Import setSortOrder action
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loader from '../components/Loader';
import { addItem } from '../slices/cartItems';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useProductsDataMutation } from '../slices/userApiSlice';
import { BsCart2 } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';


const Products = () => {
  const products = useSelector((state) => state.product);
  const productsdata = useProductsDataMutation()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch,productsdata]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const Addtocart = async (product) => {
    try {
      const response = await axios.post('https://ecommerce-mern-t1pz.onrender.com/api/users/carts', product);
      if (response.status === 200) {
       
        dispatch(addItem(product));

        
      }
      toast.success('Cart added successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  


  return (
    <section className='py-3'>
      <h1 className='font-bold text-center pb-4'>Products</h1>
      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-4 items-center pb-5">
        <div className="">
          <input
            type="text"
            placeholder='Search'
            className='outline-none border-2 py-2 text-base border-gray-800 px-2 rounded-md'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <LinkContainer to='/carts'>
            <BsCart2 size={36} />    
          </LinkContainer>
          <Link to='/carts'>
            <span>click here to see carts</span>
          </Link>
         
        </div>
      </div>
      <div>
        {products.loading && <Loader />}
        {!products.loading && products.error ? <div>Error: {products.error}</div> : null}
        <div className='flex gap-4 flex-wrap items-center justify-center '>
          {filteredProducts.map((items) => (
            <Card sx={{ maxWidth: 345 }} key={items.id}>
              <CardMedia
                sx={{ height: 140 }}
                image={items.thumbnail}
                title="thumbnail"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {items.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {items.description}
                </Typography>
              </CardContent>
              <CardActions className='flex justify-between items-start'>
                <p size="small" className='text-lg'>Price: {items.price}</p>
                <Button size="small" onClick={() => Addtocart(items)}>Add To Cart</Button>
              </CardActions>
            </Card>
          ))}
          
        </div>

      </div>
    </section>
  );
};

export default Products;
