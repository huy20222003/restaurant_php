//@mui
import { Grid } from '@mui/material';
//component
import CartDelivery from './CartDelivery';
import CartPaymentInfo from './CartPaymentInfo';
import CartShipInfo from './CartShipInfo';
//-------------------------------------------------

const CartPayment = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <CartDelivery />
        <CartPaymentInfo />
      </Grid>
      <Grid item xs={12} md={4}>
        <CartShipInfo />
      </Grid>
    </Grid>
  );
};

export default CartPayment;
