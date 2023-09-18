import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Box, Container, Stack, Typography } from '@mui/material';
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductPagnition,
} from '../../../section/@dashboard/products';
// context
import {useProduct} from '../../../hooks/context';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const {
    productsState: { products },
  } = useProduct();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <ProductCartWidget />
        {/* <Box sx={{mt: '0.8rem'}}>
          <ProductPagnition />
        </Box> */}
      </Container>
    </>
  );
}

