import PropTypes from 'prop-types';
//@mui
import {
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
//context
import { useCommon } from '../../../../hooks/context';

// Define CSS constants
const buttonBaseBuyStyle = {
  fontWeight: 700,
  lineHeight: 1.71429,
  fontSize: '0.875rem',
  textTransform: 'capitalize',
  fontFamily: '__Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica, Arial, sans-serif',
  minWidth: '64px',
  width: '100%',
  padding: '6px 12px',
  borderRadius: '8px',
  transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: 'none',
  color: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(33, 43, 54)',
};

const CartSummary = ({ orderData, selectedProducts }) => {
  const { setActiveStep } = useCommon();

  const handleNext = () => {
    if(selectedProducts.length > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('you need choose Product');
    }
  };

  const renderSubTotal = (orderData) => (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
        Sub Total
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
        {orderData?.totalPrices}
      </Typography>
    </Stack>
  );

  const renderDiscount = () => (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
        Discount
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>_</Typography>
    </Stack>
  );

  const renderShipping = () => (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
        Shipping
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Free</Typography>
    </Stack>
  );

  const renderTotal = (orderData) => (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
        Total
      </Typography>
      <Typography
        sx={{
          fontSize: '1rem',
          color: 'rgb(255, 86, 48)',
          fontWeight: 600,
        }}
      >
        {orderData?.totalPrices}
      </Typography>
    </Stack>
  );

  return (
    <>
      <Paper elevation={0} component={Card}>
        <CardHeader>
          <Typography variant="subtitle1">Order Summary</Typography>
        </CardHeader>
        <CardContent>
          <Stack sx={{ gap: '16px' }}>
            {renderSubTotal(orderData)}
            {renderDiscount()}
            {renderShipping()}
            <Divider />
            {renderTotal(orderData)}
            <FormControl fullWidth>
              <TextField
                name="discount"
                label="Discount"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ButtonBase sx={{ color: 'rgb(0, 167, 111)' }}>
                        APPLY
                      </ButtonBase>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>
        </CardContent>
      </Paper>
      <ButtonBase sx={buttonBaseBuyStyle} onClick={handleNext}>
        Check out
      </ButtonBase>
    </>
  );
};

CartSummary.propTypes = {
  orderData: PropTypes.object.isRequired,
  selectedProducts: PropTypes.array.isRequired,
};

export default CartSummary;
