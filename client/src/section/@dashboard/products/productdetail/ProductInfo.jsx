//@mui
import { Box, Button, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Label from '../../../../Components/User/label';
import ProductQuantity from './ProductQuantity';
//utils
import { fCurrency } from '../../../../utils/formatNumber';
//component
import ProductRating from '../ProductRating';


const ProductInfo = (props) => {
  const {product} = props;

  return (
    <Box component="div" paddingLeft={{ xs: 0, sm: '2rem', md: '2rem' }}>
      {product?.status && (
        <Label
          variant="filled"
          sx={{ width: '3rem', height: '1.5rem', mb: '0.8rem' }}
          color={(product?.status === 'sale' && 'error') || 'info'}
        >
          {product?.status}
        </Label>
      )}
      <Typography variant="h6" sx={{ mb: '0.8rem' }}>
        {product?.name}
      </Typography>
      <ProductRating rate={product?.rate} />
      <Typography variant="h6" sx={{ mb: '0.8rem' }}>
        {fCurrency(product?.priceSale ? product?.priceSale : product?.price)}
      </Typography>
      <Typography variant='caption'>{product?.description}</Typography>
      <Typography variant="body2" sx={{ mb: '0.4rem' }}>
        Quantity
      </Typography>
      <ProductQuantity />
      <Box sx={{ my: '1rem' }}>
        <Button
          size="medium"
          variant="contained"
          sx={{ mr: '1rem' }}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
        <Button size="medium" variant="contained">
          Buy now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
