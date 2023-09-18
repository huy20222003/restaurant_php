import styled from '@emotion/styled';
import {
  Box,
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
import Iconify from '../../../../Components/User/iconify';
import { useCart, useCommon, useAuth } from '../../../../hooks/context';

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
`;

const CartShipInfo = () => {
  const {
    cartState: { totalPrices },
  } = useCart();
  const { setActiveStep } = useCommon();
  const {authState: {user}} = useAuth();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          <Typography variant="subtitle2" sx={{p: '0.3rem'}}>Address</Typography>
          <ButtonBase component='a' href='/dashboard/profile'>
            Edit
            <Iconify icon="mingcute:pencil-line" />
          </ButtonBase>
        </Stack>
        <Stack sx={{ padding: '24px', gap: '8px' }}>
          <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.fullName}</Box>
          <Box
            sx={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'rgb(99, 115, 129)',
            }}
          >
            {user?.shipAddress}
          </Box>
          <Box
            sx={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'rgb(99, 115, 129)',
            }}
          >
           {user?.phoneNumber}
          </Box>
        </Stack>
      </Paper>
      <Paper elevation={1} component={Card}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2" sx={{ pl: '1rem' }}>
            Summary
          </Typography>
        </Stack>
        <CardContent>
          <Stack sx={{ gap: '16px' }}>
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                Sub Total
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {totalPrices}
              </Typography>
            </Stack>
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                Discount
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                _
              </Typography>
            </Stack>
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                Shipping
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
               Free
              </Typography>
            </Stack>
            <Divider />
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
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
                {totalPrices}
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
        <StyledButtonBaseBuy onClick={handleNext}>
          Check out
        </StyledButtonBaseBuy>
      </Paper>
      <ButtonBase onClick={handleBack}>
        <Iconify icon="eva:arrow-ios-back-fill" />
        Back
      </ButtonBase>
    </>
  );
};

export default CartShipInfo;
