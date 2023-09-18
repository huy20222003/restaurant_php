import { useState } from 'react'; 
import styled from '@emotion/styled';
import {
  Box,
  Card,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../../../Components/User/iconify';

const StyledPaper = styled(Paper)`
  && {
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    border: 1px solid rgba(145, 158, 171, 0.16);
    background-image: none;
    padding: 10px;
    cursor: pointer;
    display: flex;

    &:active {
      box-shadow: rgb(33, 43, 54) 0px 0px 0px 2px;
    }
  }
`;

const CartDelivery = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleDeliveryClick = (shippingUnit) => {
    setSelectedDelivery(shippingUnit);
  };

  return (
    <Paper elevation={1} component={Card}>
      <Typography variant="subtitle2" sx={{p: '0.3rem'}}>Delivery</Typography>
      <Box
        sx={{ display: 'flex', p: '24px', gap: '20px 16px', flexWrap: 'wrap' }}
      >
        <StyledPaper
          component={Card}
          onClick={() => handleDeliveryClick('Standard')}
          sx={
            selectedDelivery === 'Standard'
              ? {
                  boxShadow: 'rgb(33, 43, 54) 0px 0px 0px 2px',
                }
              : {}
          }
        >
          <Iconify
            icon="eva:paper-plane-fill"
            sx={{ width: '28px', height: '28px', mr: '0.8rem' }}
          />
          <ListItemText>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                Standard
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgb(99, 115, 129)',
                    fontWeight: 400,
                    m: '0 0 4px',
                  }}
                >
                  5-7 days delivery
                </Typography>
              </Box>
              <Box component="span" sx={{ ml: '2rem' }}>
                20.000
              </Box>
            </Stack>
          </ListItemText>
        </StyledPaper>
        <StyledPaper
          component={Card}
          onClick={() => handleDeliveryClick('Express')}
          sx={
            selectedDelivery === 'Express'
              ? {
                  boxShadow: 'rgb(33, 43, 54) 0px 0px 0px 2px',
                }
              : {}
          }
        >
          <Iconify
            icon="mdi:truck"
            sx={{ width: '28px', height: '28px', mr: '0.8rem' }}
          />
          <ListItemText>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                Express
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgb(99, 115, 129)',
                    fontWeight: 400,
                    m: '0 0 4px',
                  }}
                >
                  3-5 days delivery
                </Typography>
              </Box>
              <Box component="span" sx={{ ml: '2rem' }}>
                25.000
              </Box>
            </Stack>
          </ListItemText>
        </StyledPaper>
        <StyledPaper
          component={Card}
          onClick={() => handleDeliveryClick('J&T Express')}
          sx={
            selectedDelivery === 'J&T Express'
              ? {
                  boxShadow: 'rgb(33, 43, 54) 0px 0px 0px 2px',
                }
              : {}
          }
        >
          <Iconify
            icon="mdi:bird"
            sx={{ width: '28px', height: '28px', mr: '0.8rem' }}
          />
          <ListItemText>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
              J&T Express
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgb(99, 115, 129)',
                    fontWeight: 400,
                    m: '0 0 4px',
                  }}
                >
                  4-5 days delivery
                </Typography>
              </Box>
              <Box component="span" sx={{ ml: '2rem' }}>
                22.000
              </Box>
            </Stack>
          </ListItemText>
        </StyledPaper>
      </Box>
    </Paper>
  );
};

export default CartDelivery;
