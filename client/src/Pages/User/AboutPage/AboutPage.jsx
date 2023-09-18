//@mui
import { Box, Container } from '@mui/material';
//component
import { Banner, WhatIs, Slider } from '../../../section/about';

//----------------------------------------------

const FAQPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Banner />
      <Container maxWidth="lg" sx={{ py: '120px' }}>
        <WhatIs />
        <Box sx={{ pt: '100px' }}>
          <Slider />
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;
