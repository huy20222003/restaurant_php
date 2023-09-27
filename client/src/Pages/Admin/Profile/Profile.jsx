import { Helmet } from 'react-helmet-async';
//@mui
import { Container, Typography, Grid } from '@mui/material';
//component
import { ProfileCardAvatar, ProfileCardInfo } from '../../../section/admin/profile';
//----------------------------------------------------

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>{'Profile'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ my: 5 }}>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <ProfileCardAvatar />
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <ProfileCardInfo />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
