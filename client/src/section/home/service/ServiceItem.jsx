//@mui
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
//component
import SvgColor from '../../../Components/User/svg-color';

//----------------------------------

const ServiceItem = ({ iconSrc, title, description }) => {
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Paper
        sx={{
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'rgb(45, 55, 72)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          boxShadow: 'rgba(140, 152, 164, 0.25) 0px 3px 6px 0px',
          overflow: 'hidden',
          padding: '32px',
          borderRadius: '16px',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ backgroundColor: 'rgb(26, 115, 232)' }}>
            <SvgColor src={iconSrc} sx={{ width: 0.7, height: 0.7 }} />
          </Avatar>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ServiceItem;
