import PropTypes from 'prop-types';
//@mui
import { Card, Grid, Paper, Stack, TextField } from '@mui/material';

//-----------------------------------------------------------

const ProductFormDetail = ({ productData, setProductData }) => {
  return (
    <Paper elevation={0} component={Card}>
      <Stack sx={{ gap: '24px', padding: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="price"
              label="Regular Price"
              fullWidth
              value={productData.price}
              onChange={(e) => {
                setProductData({ ...productData, price: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="priceSale"
              label="Price Sale"
              fullWidth
              value={productData.priceSale}
              onChange={(e) => {
                setProductData({ ...productData, priceSale: e.target.value });
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

ProductFormDetail.propTypes = {
  productData: PropTypes.object.isRequired,
  setProductData: PropTypes.func.isRequired,
};

export default ProductFormDetail;
