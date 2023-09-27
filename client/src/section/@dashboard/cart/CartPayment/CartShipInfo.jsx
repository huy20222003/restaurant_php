import PropTypes from 'prop-types';
//@mui
import styled from '@emotion/styled';
import {
  ButtonBase,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
//component
import Iconify from '../../../../Components/User/iconify';
//context
import { useCommon, useAuth } from '../../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//-----------------------------------------------------------------

const StyledButtonBaseBuy = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    width: 100%;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
  }
};`;

// Function to render address information
const renderAddressInfo = (user) => (
  <>
    <Typography variant="subtitle2" sx={{ p: '0.3rem' }}>
      Address
    </Typography>
    <Stack sx={{ padding: '24px', gap: '8px' }}>
      <Typography fontSize="0.875rem" fontWeight={600}>
        {user?.fullName}
      </Typography>
      <Typography
        fontSize="0.875rem"
        fontWeight={400}
        color="rgb(99, 115, 129)"
      >
        {user?.shipAddress}
      </Typography>
      <Typography
        fontSize="0.875rem"
        fontWeight={400}
        color="rgb(99, 115, 129)"
      >
        {user?.phoneNumber}
      </Typography>
    </Stack>
  </>
);

// Function to render summary information
const renderSummaryInfo = (orderData, handleNext) => (
  <>
    <Typography variant="subtitle2" sx={{ pl: '1rem' }}>
      Summary
    </Typography>
    <CardContent>
      <Stack gap="16px">
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="rgb(99, 115, 129)">
            Sub Total
          </Typography>
          <Typography fontSize="0.875rem" fontWeight={600}>
            {orderData?.totalPrices}
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="rgb(99, 115, 129)">
            Discount
          </Typography>
          <Typography fontSize="0.875rem" fontWeight={600}>
            _
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="rgb(99, 115, 129)">
            Shipping
          </Typography>
          <Typography fontSize="0.875rem" fontWeight={600}>
            {orderData?.shippingFee}
          </Typography>
        </Stack>
        <Divider />
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="rgb(99, 115, 129)">
            Total
          </Typography>
          <Typography fontSize="1rem" color="rgb(255, 86, 48)" fontWeight={600}>
            {orderData?.totalPrices + orderData?.shippingFee}
          </Typography>
        </Stack>
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
    <StyledButtonBaseBuy onClick={handleNext}>Check out</StyledButtonBaseBuy>
  </>
);

const CartShipInfo = ({ orderData, setOrderData }) => {
  const { setActiveStep } = useCommon();
  const {
    authState: { user },
  } = useAuth();

  const handleNext = () => {
    if (orderData?.shippingUnit !== '' && orderData.paymentMethod !== '') {
      const newTotalPrices = orderData?.totalPrices + orderData?.shippingFee;
      setOrderData({
        ...orderData,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        shipAddress: user?.shipAddress,
        totalPrices: newTotalPrices,
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      Swal.fire(
        'Error',
        'You must choose one delivery and shipping unit',
        'error'
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Paper elevation={1} component={Card}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {renderAddressInfo(user)}
          <ButtonBase component="a" href="/dashboard/profile">
            Edit
            <Iconify icon="mingcute:pencil-line" />
          </ButtonBase>
        </Stack>
      </Paper>
      <Paper elevation={1} component={Card}>
        {renderSummaryInfo(orderData, handleNext)}
      </Paper>
      <ButtonBase onClick={handleBack}>
        <Iconify icon="eva:arrow-ios-back-fill" />
        Back
      </ButtonBase>
    </>
  );
};

CartShipInfo.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
};

export default CartShipInfo;
