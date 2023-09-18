//@mui
import { Button, Grid, Typography } from '@mui/material';
import { useProduct } from '../../../../hooks/context';
//----------------------------------------------------

const ProductQuantity = () => {
  const {quantity, setQuantity} = useProduct();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button variant="outlined" onClick={handleDecrease}>
          -
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body1">{quantity}</Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={handleIncrease}>
          +
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductQuantity;
