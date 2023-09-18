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
import styled from '@emotion/styled';
//context
import { useCart, useCommon } from '../../../../hooks/context';

//-------------------------------

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

const CartSummary = () => {
  const {
    cartState: { totalPrices },
  } = useCart();
  const {setActiveStep} = useCommon();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Paper elevation={0} component={Card}>
        <CardHeader>
          <Typography variant="subtitle1">Order Summary</Typography>
        </CardHeader>
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
      </Paper>
      <StyledButtonBaseBuy onClick={handleNext}>Check out</StyledButtonBaseBuy>
    </>
  );
};

export default CartSummary;
