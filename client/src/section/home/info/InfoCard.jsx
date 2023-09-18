//@mui

import { Box, Divider, Grid, Typography } from '@mui/material';

//-----------------------------------------------

const InfoCard = ({ title, value, description }) => {
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Box
        sx={{
          textAlign: 'center',
          lineHeight: 1,
          opacity: 1,
          background: 'transparent',
          color: 'rgb(52, 71, 103)',
          boxShadow: 'none',
          padding: '2.5rem',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            position: 'relative',
            zIndex: 1,
            margin: '0px',
            textDecoration: 'none',
            color: 'rgb(26, 115, 232)',
          }}
        >
          <span>{value}</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            opacity: 1,
            textTransform: 'none',
            verticalAlign: 'unset',
            textDecoration: 'none',
            color: 'rgb(52, 71, 103)',
            letterSpacing: '-0.125px',
            margin: '16px 0px 8px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            m: 0,
            color: 'rgb(52, 71, 103)',
            letterSpacing: '-0.125px',
            opacity: 1,
            textTransform: 'none',
            verticalAlign: 'unset',
            textDecoration: 'none',
          }}
        >
          {description}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Grid>
  );
};

export default InfoCard;
