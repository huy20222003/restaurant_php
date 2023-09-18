//@mui

import { Grid, Typography, Box, Stack, LinearProgress } from '@mui/material';

//----------------------------------------

const WhatIs = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 0 }}>
      <Grid item md={5}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box
            component="img"
            src="/assets/images/background/hero.jpg"
            sx={{
              borderRadius: '24px',
              boxShadow: 'rgba(145, 158, 171, 0.24) -40px 40px 80px',
              width: '220px',
              objectFit: 'cover',
              height: '220px',
              mr: '1rem',
            }}
          ></Box>
          <Box
            component="img"
            src="/assets/images/background/hero.jpg"
            sx={{
              borderRadius: '24px',
              boxShadow: 'rgba(145, 158, 171, 0.24) -40px 40px 80px',
              width: '220px',
              objectFit: 'cover',
              height: '290px',
            }}
          ></Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="h3" sx={{ m: '0px 0px 24px' }}>
          What is Restaurant?
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
          Our theme is the most advanced and user-friendly theme you will find
          on the market, we have documentation and video to help set your site
          really easily, pre-installed demos you can import in one click and
          everything from the theme options to page content can be edited from
          the front-end. This is the theme you are looking for.
        </Typography>
        <Stack sx={{ gap: '24px', my: '40px' }}>
          <Box>
            <Stack
              sx={{
                marginBottom: '12px',
              }}
            >
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  Development
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                  20%
                </Typography>
              </Stack>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={20} />
              </Box>
            </Stack>
            <Stack
              sx={{
                marginBottom: '12px',
              }}
            >
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  Work
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                  40%
                </Typography>
              </Stack>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={40} />
              </Box>
            </Stack>
            <Stack
              sx={{
                marginBottom: '12px',
              }}
            >
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  Friendly
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                  80%
                </Typography>
              </Stack>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={80} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default WhatIs;
