import { useNavigate } from 'react-router-dom';
//@mui
import { Box, Button, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

//compomnent
import Iconify from '../../../Components/User/iconify';

//-----------------------------------------------

const CartWithoutProducts = () => {
  const navigate = useNavigate();
  const handleNavigateProduct = ()=> {
    navigate('/dashboard/products');
  }
  return (
    <Box component="div" sx={{ textAlign: 'center' }}>
      <Iconify icon="eva:shopping-cart-outline" />
      <Typography variant="subtitle1" sx={{my: '1rem'}}>
        There are no products in the cart
      </Typography>
      <Button
        size="medium"
        variant="contained"
        onClick={handleNavigateProduct}
        startIcon={<AddShoppingCartIcon />}
      >
        Buy now
      </Button>
    </Box>
  );
};

export default CartWithoutProducts;
