//@mui
import { Box, Typography } from '@mui/material';
import { ProductList } from '../.././@dashboard/products';
//context
import { useProduct } from '../../../hooks/context';
//---------------------------------------------

const RecentlyProducts = () => {
  const {
    productsState: { products },
  } = useProduct();
  const productsArray = products.slice(products.length - 30);
  return (
    <Box sx={{ p: '40px 0' }}>
      <Typography variant="h5" sx={{pb: '40px'}}>Recently Products</Typography>
      <Box>
        <ProductList products={productsArray} />
      </Box>
    </Box>
  );
};

export default RecentlyProducts;
