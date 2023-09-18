//@mui

import { Box, Divider, Stack, Typography } from '@mui/material';

//-----------------------------------------

const CartConfirmProductItem = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        px: '1rem',
        pb: '0.5rem',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Box
            component="img"
            src="/assets/images/background/hero.jpg"
            sx={{
              width: '70px',
              height: '70px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          ></Box>
          <Stack sx={{ pl: '0.5rem' }}>
            <Typography variant="body1">Coca cola</Typography>
            <Stack
              sx={{
                alignItems: 'center',
                fontWeight: 400,
                color: 'rgb(99, 115, 129)',
                flexDirection: 'row',
              }}
            >
              size:
              <Box
                component="span"
                sx={{
                  height: '24px',
                  minWidth: '24px',
                  lineHeight: '0',
                  borderRadius: '6px',
                  cursor: 'default',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  textTransform: 'capitalize',
                  padding: '0px 6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  color: 'rgb(99, 115, 129)',
                  backgroundColor: 'rgba(145, 158, 171, 0.16)',
                  marginLeft: '4px',
                }}
              >
                6
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box
                sx={{
                  width: '0.7rem',
                  height: '0.7rem',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  ml: '0.3rem',
                }}
              ></Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '20%',
          }}
        >
          <Typography variant="body2">x1</Typography>
          <Typography variant="body2">22.000</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartConfirmProductItem;
