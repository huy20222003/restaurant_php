import { useNavigate } from 'react-router-dom';
//@mui
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
//component
import Iconify from '../../../Components/User/iconify';
//context
import { useOrder } from '../../../hooks/context';
//-------------------------------------------------------------

const OrderTabPanel = () => {
  const navigate = useNavigate();
  const { ordersState } = useOrder();
  const { orders } = ordersState;

  const handleNavigate = (orderId) => {
    navigate(`/dashboard/order/${orderId}`);
  };

  return (
    <>
      {orders.map((order) => (
        <Paper
          key={order.id}
          elevation={3}
          sx={{ p: '12px', cursor: 'pointer', my: '1rem' }}
          onClick={() => handleNavigate(order.id)}
        >
          {order?.status && (
            <Stack
              variant="filled"
              sx={{
                height: '1.8rem',
                p: '0.5rem',
                mb: '0.4rem',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '0.25rem',
                display: 'inline-flex',
                color: '#fff',
                backgroundColor:
                  order?.status === 'ordered' ? 'success.main' : 'info.main',
              }}
            >
              <Iconify icon="material-symbols:check" sx={{mr: '0.2rem'}} />
              <Typography variant='body2'>{order?.status}</Typography>
            </Stack>
          )}
          <Divider />
          <Box sx={{ p: '1rem 0' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    borderRadius: '4px',
                    border: '0.5px solid rgb(238, 238, 238)',
                    backgroundImage: `url(${order?.order_details[0]?.product?.image_products[0]?.imageUrl})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      color: 'rgb(128, 128, 137)',
                      backgroundColor: 'rgb(235, 235, 240)',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: '10px',
                    }}
                  >
                    x{order?.order_details[0]?.quantity}
                  </Typography>
                </Box>
                <Stack sx={{ mx: '12px' }}>
                  <Typography variant="body2">
                    {order?.order_details[0]?.product?.name}
                  </Typography>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgb(128, 128, 137)', mx: '0.25rem' }}
                    >
                      size: {order?.order_details[0]?.size}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgb(128, 128, 137)', mx: '0.25rem' }}
                    >
                      color: {order?.order_details[0]?.color}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box>
                <Typography variant="body2">
                  {order?.order_details[0]?.product?.priceSale
                    ? order?.order_details[0]?.product?.priceSale
                    : order?.order_details[0]?.product?.price}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
          <Stack sx={{ mt: '12px', alignItems: 'flex-end' }}>
            <Box>
              <Typography variant="body2">
                Total: {order?.totalPrices + order?.shippingFee}
              </Typography>
            </Box>
            <Stack sx={{ flexDirection: 'row', mt: '12px' }}>
              <Button size="medium" variant="outlined">
                View Detail
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </>
  );
};

export default OrderTabPanel;
