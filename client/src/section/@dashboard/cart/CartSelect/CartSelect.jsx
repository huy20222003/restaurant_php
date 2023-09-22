import { useState } from 'react';
import PropTypes from 'prop-types';
//@mui
import { Grid } from '@mui/material';
//component
import CartTable from './CartTable';
import CartSummary from './CartSummary';

//--------------------------------------------------

const CartSelect = ({ orderData, setOrderData }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <CartTable
          orderData={orderData}
          setOrderData={setOrderData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CartSummary
          orderData={orderData}
          setOrderData={setOrderData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Grid>
    </Grid>
  );
};

CartSelect.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
};

export default CartSelect;
