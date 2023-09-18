import {useNavigate} from 'react-router-dom';
//@mui
import { Paper, Card, Typography, Stack, ButtonBase } from '@mui/material';
import styled from '@emotion/styled';
//component
import CartConfirmProductItem from './CartConfirmProductItem';

//---------------------------------------------------------------

const StyledButtonBaseConfirm = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    width: 80%;
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
`;

const CartConfirm = () => {
  const navigate = useNavigate();

  const handleNavigate = ()=> {
    navigate('/cart/cart-order-success');
  }

  return (
    <Paper
      elevation={3}
      component={Card}
      sx={{ width: '40rem', margin: '0 auto' }}
    >
      <Typography variant="h5" sx={{ p: '1rem', textAlign: 'center' }}>
        Order Confirm
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'left', p: '1rem 0.5rem' }}>
        Detail
      </Typography>
      <Stack sx={{ alignItems: 'center' }}>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            px: '1rem',
            pb: '0.5rem',
          }}
        >
          <Typography variant="body1">FullName</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Nguyen Huy
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            px: '1rem',
            pb: '0.5rem',
          }}
        >
          <Typography variant="body1">Phone Number</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            9999999999
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            px: '1rem',
            pb: '0.5rem',
          }}
        >
          <Typography variant="body1">Address</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Ha Noi, Viet Nam
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            px: '1rem',
            pb: '0.5rem',
          }}
        >
          <Typography variant="body1">Shipping Uniy</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Standard
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            px: '1rem',
            pb: '0.5rem',
          }}
        >
          <Typography variant="body1">Shipping Fee</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            22.000
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h6" sx={{ textAlign: 'left', p: '1rem 0.5rem' }}>
        Products
      </Typography>
      <Stack sx={{ alignItems: 'center' }}>
        <CartConfirmProductItem />
      </Stack>
      <Stack
        sx={{
          m: '1rem 0',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <StyledButtonBaseConfirm onClick={handleNavigate}>Confirm Order</StyledButtonBaseConfirm>
      </Stack>
    </Paper>
  );
};

export default CartConfirm;
