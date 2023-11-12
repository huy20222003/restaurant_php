import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
//@mui
import { Box, Container, Typography } from '@mui/material';
//component
import {
  CartWithoutProducts,
  CartStepper,
} from '../../../section/@dashboard/cart';
//context
import { useCart } from '../../../hooks/context';
//----------------------------------------------------

const CartPage = () => {
  const {
    cartState: { items },
    handleGetCart,
  } = useCart();

  useEffect(() => {
    handleGetCart();
  }, [handleGetCart]);

  return (
    <>
      <Helmet>
        <title>{'Cart'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 5 }}>
          Checkout
        </Typography>
        {items?.length > 0 ? (
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Container>
              <CartStepper />
            </Container>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '20rem',
            }}
          >
            <CartWithoutProducts />
          </Box>
        )}
      </Container>
    </>
  );
};

export default CartPage;
