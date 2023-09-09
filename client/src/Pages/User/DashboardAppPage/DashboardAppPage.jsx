import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// sections


// ----------------------------------------------------------------------

const DashboardAppPage=()=> {

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
         
        </Grid>
      </Container>
    </>
  );
}

export default DashboardAppPage;