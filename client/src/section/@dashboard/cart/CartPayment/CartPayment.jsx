import PropTypes from 'prop-types';
//@mui
import { Grid } from '@mui/material';
//component
import CartDelivery from './CartDelivery';
import CartPaymentInfo from './CartPaymentInfo';
import CartShipInfo from './CartShipInfo';
//----------------------------------------------

const CartPayment = ({ orderData, setOrderData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <CartDelivery orderData={orderData} setOrderData={setOrderData} />
        <CartPaymentInfo orderData={orderData} setOrderData={setOrderData} />
      </Grid>
      <Grid item xs={12} md={4}>
        <CartShipInfo orderData={orderData} setOrderData={setOrderData} />
      </Grid>
    </Grid>
  );
};

CartPayment.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
};

export default CartPayment;
