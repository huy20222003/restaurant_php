import { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../../../Components/User/iconify';

const CartPaymentInfo = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelectPayment = (method) => {
    setSelectedPayment(method);
  };

  const getPaperStyle = (method) => {
    return {
      color: 'rgb(33, 43, 54)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderRadius: '8px',
      border: `1px solid ${
        selectedPayment === method ? 'black' : 'rgba(145, 158, 171, 0.16)'
      }`,
      backgroundImage: 'none',
      padding: '10px',
      marginTop: '20px',
      cursor: 'pointer',
    };
  };

  return (
    <Paper elevation={0} component={Card}>
      <CardHeader>
        <Typography component="span" sx={{p: '0.3rem'}}>Payment</Typography>
      </CardHeader>
      <Stack sx={{ p: '0 24px 24px 24px' }}>
        <Paper style={getPaperStyle('Cash')} onClick={() => handleSelectPayment('Cash')}>
          <ListItemText sx={{ minWidth: 0, m: 0 }}>
            <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Pay with cash</Typography>
                <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                  Pay with cash when your order is delivered.
                </Typography>
              </Box>
              <Stack
                sx={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
              >
                <Iconify icon="mdi:cash" />
              </Stack>
            </Stack>
          </ListItemText>
        </Paper>
      </Stack>
    </Paper>
  );
};

export default CartPaymentInfo;
