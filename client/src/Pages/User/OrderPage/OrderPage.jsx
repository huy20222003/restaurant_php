import { useEffect } from 'react';
//@mui
import { Box, Container } from '@mui/material';
//component
import { OrderTab } from '../../../section/@dashboard/order';
//OrderContext
import { useOrder } from '../../../hooks/context';
//----------------------------------------------------------------

const OrderPage = () => {
  const { handleGetAllOrdersById } = useOrder();

  useEffect(() => {
    handleGetAllOrdersById();
  }, [handleGetAllOrdersById]);

  return (
    <Box sx={{ width: '100%' }}>
      <Container>
        <OrderTab />
      </Container>
    </Box>
  );
};

export default OrderPage;
