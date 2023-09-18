import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//toast
import { toast } from 'react-toastify';
//component
import Label from '../../../../Components/User/label';
import ProductQuantity from './ProductQuantity';
import ProductRating from '../ProductRating';
//utils
import { fCurrency } from '../../../../utils/formatNumber';
import { useProduct, useCart } from '../../../../hooks/context';
//-------------------------------------------------------------------

const ProductInfo = ({ product }) => {
  const { quantity, setQuantity } = useProduct();
  const navigate = useNavigate();
  const { handleUpdateCart } = useCart();

  useEffect(() => {
    setQuantity(1);
  }, [setQuantity]);

  const handleUpdate = useCallback(async () => {
    try {
      const updateData = await handleUpdateCart({
        productId: product?._id,
        quantity,
      });
      if (updateData.success) {
        toast.success('Add to cart successful');
      } else {
        toast.error('Add to cart failed!');
      }
      setQuantity(1);
    } catch (error) {
      toast.error('Server Error');
    }
  }, [handleUpdateCart, product?._id, quantity, setQuantity]);

  const handleNavigateCheckout = () => {
    handleUpdate();
    navigate('/dashboard/order');
  };

  const renderColor = () => {
    return product?.color.map((color) => (
      <MenuItem key={color} value={color}>
        {color}
      </MenuItem>
    ));
  };

  const renderSize = () => {
    return product?.size.map((size) => (
      <MenuItem key={size} value={size}>
        {size}
      </MenuItem>
    ));
  };

  return (
    <Box component="div" paddingLeft={{ xs: 0, sm: '2rem', md: '2rem' }}>
      {product?.status && (
        <Label
          variant="filled"
          sx={{
            width: '3rem',
            height: '1.5rem',
            mb: '0.8rem',
            color: product?.status === 'sale' ? 'error' : 'info',
          }}
        >
          {product?.status}
        </Label>
      )}
      <Typography variant="h6" sx={{ mb: '0.8rem' }}>
        {product?.name}
      </Typography>
      <ProductRating rate={product?.rate} />
      <Typography variant="h6" sx={{ my: '1rem' }}>
        {fCurrency(product?.priceSale ?? product?.price)}
      </Typography>
      <Typography variant="caption" sx={{ py: '2rem' }}>
        {product?.subDescription}
      </Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ mb: '0.4rem' }}>
          Quantity
        </Typography>
        <ProductQuantity />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <Typography>Colors</Typography>
        <FormControl sx={{ width: '80px' }}>
          <InputLabel id="demo-simple-select-label">Colors</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={product?.color}
          >
            {renderColor()}
          </Select>
        </FormControl>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <Typography>Size</Typography>
        <FormControl sx={{ width: '80px' }}>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={product?.size}
          >
            {renderSize()}
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ my: '1rem' }}>
        <Button
          size="medium"
          variant="outlined"
          sx={{ mr: '1rem' }}
          onClick={handleUpdate}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={handleNavigateCheckout}
        >
          Buy now
        </Button>
      </Box>
    </Box>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    subDescription: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.string), // Đảm bảo color là một mảng chuỗi
    size: PropTypes.arrayOf(PropTypes.string), // Đảm bảo size là một mảng chuỗi
  }),
};

export default ProductInfo;
