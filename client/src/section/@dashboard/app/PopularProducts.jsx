//@mui
import { Box, Typography } from '@mui/material';
import { ProductList } from '../.././@dashboard/products';
//context
import { useProduct } from '../../../hooks/context';
//---------------------------------------------

const PopularProducts = () => {
  const {
    productsState: { products },
  } = useProduct();
  const productsArray = products.filter((product) => {
    return product?.rate >= 4.0;
  });
  return (
    <Box sx={{ p: '40px 0' }}>
      <Typography variant="h5" sx={{pb: '40px'}}>Popular Products</Typography>
      <Box>
        <ProductList products={productsArray} />
      </Box>
    </Box>
  );
};

export default PopularProducts;
