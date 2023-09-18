//@mui

import { Box, Container, FormControl, Stack, TextField } from '@mui/material';

//-----------------------------------------------------

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        background:
          'linear-gradient(rgba(22, 28, 36, 0.8), rgba(22, 28, 36, 0.8)) center center / cover no-repeat, url(/assets/images/background/hero.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        overflow: 'hidden',
        height: '560px',
        mt: '74px'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ bottom: '80px', position: 'absolute', textAlign: 'unset' }}>
          <div>
            <Box
              sx={{
                fontWeight: 800,
                lineHeight: 1.25,
                fontSize: '3.5rem',
                fontFamily: 'Public Sans, sans-serif',
                overflow: 'hidden',
                display: 'inline-flex',
                color: 'rgb(0, 167, 111)',
              }}
            >
              <span style={{ opacity: 1, transform: 'none' }}>H</span>
              <span style={{ opacity: 1, transform: 'none' }}>o</span>
              <span style={{ opacity: 1, transform: 'none' }}>w</span>
            </Box>
            <br />
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '16px;',
                display: 'inline-flex',
                color: 'rgb(255, 255, 255)',
              }}
            >
              <Box
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.25,
                  fontSize: '3rem',
                  fontFamily: 'Public Sans, sans-serif',
                  overflow: 'hidden',
                  display: 'inline-flex',
                }}
              >
                <span style={{ opacity: 1, transform: 'none' }}>c</span>
                <span style={{ opacity: 1, transform: 'none' }}>a</span>
                <span style={{ opacity: 1, transform: 'none' }}>n</span>
              </Box>
              <Box
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.25,
                  fontSize: '3rem',
                  fontFamily: 'Public Sans, sans-serif',
                  overflow: 'hidden',
                  display: 'inline-flex',
                }}
              >
                <span style={{ opacity: 1, transform: 'none' }}>w</span>
                <span style={{ opacity: 1, transform: 'none' }}>e</span>
              </Box>
              <Box
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.25,
                  fontSize: '3rem',
                  fontFamily: 'Public Sans, sans-serif',
                  overflow: 'hidden',
                  display: 'inline-flex',
                }}
              >
                <span style={{ opacity: 1, transform: 'none' }}>h</span>
                <span style={{ opacity: 1, transform: 'none' }}>e</span>
                <span style={{ opacity: 1, transform: 'none' }}>l</span>
                <span style={{ opacity: 1, transform: 'none' }}>p</span>
              </Box>
              <Box
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.25,
                  fontSize: '3rem',
                  fontFamily: 'Public Sans, sans-serif',
                  overflow: 'hidden',
                  display: 'inline-flex',
                }}
              >
                <span style={{ opacity: 1, transform: 'none' }}>y</span>
                <span style={{ opacity: 1, transform: 'none' }}>o</span>
                <span style={{ opacity: 1, transform: 'none' }}>u</span>
                <span style={{ opacity: 1, transform: 'none' }}>?</span>
              </Box>
            </Stack>
          </div>
          <div style={{opacity: 1}}>
                <FormControl fullWidth sx={{minWidth: '360px', m: '40px 0 0', display: 'inline-flex'}}>
                    <TextField 
                    sx={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: '8px'}}
                    label='Search Support'
                    />
                </FormControl>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
