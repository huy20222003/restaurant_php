//@mui
import { Box, Grid, Typography } from '@mui/material';
//svg color
import Iconify from '../../../../Components/User/iconify';
//-----------------------------------------------

const ProductService = () => {
  return (
    <Grid container sx={{my: '4.5rem'}}>
      <Grid item xs={12} sm={4} md={4}>
        <Box sx={{px: '3.5rem', textAlign: 'center', pb: {xs: '2rem', sm: 0, md: 0}}}>
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: 'rgb(0, 167, 111)' }}
            width={24}
            height={24}
          />
          <Typography variant="subtitle1">100% Original</Typography>
          <Typography variant="body2">
            Chocolate bar candy canes ice cream toffee cookie halvah.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box sx={{px: '3.5rem', textAlign: 'center', pb: {xs: '2rem', sm: 0, md: 0}}}>
          <Iconify
            icon="eva:clock-fill"
            sx={{ color: 'rgb(0, 167, 111)' }}
            width={24}
            height={24}
          />
          <Typography variant="subtitle1">100% Original</Typography>
          <Typography variant="body2">
            Chocolate bar candy canes ice cream toffee cookie halvah.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box sx={{px: '3.5rem', textAlign: 'center', pb: {xs: '2rem', sm: 0, md: 0}}}>
          <Iconify
            icon="eva:clock-fill"
            sx={{ color: 'rgb(0, 167, 111)' }}
            width={24}
            height={24}
          />
          <Typography variant="subtitle1">100% Original</Typography>
          <Typography variant="body2">
            Chocolate bar candy canes ice cream toffee cookie halvah.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductService;
