/* eslint-disable react/prop-types */
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//@mui
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
//component
import OrderTimeLine from './OrderTimeLine';
//context
import { useOrder } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//-------------------------------------------------

const OrderDetail = ({ orderInfo }) => {
  const { handleUpdateOrder } = useOrder();
  const { id } = useParams();

  const { totalPrices, shippingFee, status, order_details } = orderInfo;

  const handleUpdate = useCallback(async (type) => {
    if (!type) {
      return;
    }

    const response = await handleUpdateOrder(id, { status: type });
    if (!response.success) {
      Swal.fire('', `${type} failed`, 'error');
    } else {
      Swal.fire('', `${type} success`, 'success');
    }
    setTimeout(() => window.location.reload(), 3000);
  }, [handleUpdateOrder, id]);

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          my: '1rem',
          p: '1rem',
        }}
      >
        <Box>
          <Typography variant="h6">Details</Typography>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ p: '16px 0', width: '100%' }}>
              {order_details.map((order) => (
                <Box key={order?.id}>
                  <Stack
                    key={order?.product?.name}
                    sx={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      my: '1rem',
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
                          backgroundImage: `url(${order?.product?.image_products[0]?.imageUrl})`,
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
                          x{order?.quantity}
                        </Typography>
                      </Box>
                      <Stack sx={{ mx: '12px' }}>
                        <Typography variant="body2">
                          {order?.product?.name}
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          {order?.size && (
                            <Typography
                              variant="caption"
                              sx={{ color: 'rgb(128, 128, 137)' }}
                            >
                              size: {order?.size}
                            </Typography>
                          )}
                          {order?.color && (
                            <Typography
                              variant="caption"
                              sx={{ color: 'rgb(128, 128, 137)' }}
                            >
                              color: {order?.color}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        {order?.product?.priceSale || order?.product?.price}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Stack>
          <Divider />
          <Box sx={{ p: '12px 0' }}>
            <Stack sx={{ gap: '12px', alignItems: 'flex-end' }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Sub Total:</Typography>
                <Typography variant="subtitle2">
                  {parseFloat(totalPrices)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Shipping Fee:</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(255, 86, 48)' }}
                >
                  {parseFloat(shippingFee)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Discount:</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(255, 86, 48)' }}
                >
                  0
                </Typography>
              </Stack>
              <Divider />
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Total:</Typography>
                <Typography variant="subtitle2">
                  {parseFloat(totalPrices + shippingFee)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  gap: '0.75rem',
                  alignItems: 'center',
                  pt: '1rem',
                }}
              >
                {status !== 'ordered' && (
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={status === 'confirmed'}
                    onClick={() => handleUpdate('return')}
                  >
                    Cancell
                  </Button>
                )}
                {status === 'ordered' && (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={status === 'confirmed'}
                    onClick={() => handleUpdate('confirmed')}
                  >
                    Confirm
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          my: '1rem',
          p: '1rem',
        }}
      >
        <OrderTimeLine orderInfo={orderInfo} />
      </Paper>
    </Box>
  );
};

OrderDetail.propTypes = {
  orderInfo: PropTypes.shape({
    product: PropTypes.shape({
      name: PropTypes.string,
      priceSale: PropTypes.number,
      price: PropTypes.number,
      image_products: PropTypes.object,
    }),
    size: PropTypes.string,
    color: PropTypes.string,
    quantity: PropTypes.number,
    totalPrices: PropTypes.number,
    shippingFee: PropTypes.number,
    status: PropTypes.string,
    isReview: PropTypes.bool,
  }),
};

export default memo(OrderDetail);
