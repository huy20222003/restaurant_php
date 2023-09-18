//@mui
import { Box, Container } from '@mui/material';
//component
import { OrderTab } from '../../../section/@dashboard/order';
//----------------------------------------------------------------

const OrderPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Container>
        <OrderTab />
      </Container>
    </Box>
  );
};

export default OrderPage;
