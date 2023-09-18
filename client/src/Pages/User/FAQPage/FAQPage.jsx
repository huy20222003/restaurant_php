//@mui
import { Box, Container, Grid } from '@mui/material';
//component
import { Banner, Service, Accordion, ContactForm } from '../../../section/faq';

//----------------------------------------------

const FAQPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Banner />
      <Container maxWidth="lg" sx={{ pt: '120px' }}>
        <Service />
        <Grid container spacing={2} sx={{py: '100px'}}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQPage;
