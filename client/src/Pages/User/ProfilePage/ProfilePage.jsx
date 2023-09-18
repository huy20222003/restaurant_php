import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
//@mui
import { Container, Typography, Grid } from '@mui/material';
//component
import { ProfileCardAvatar, ProfileCardInfo } from '../../../section/@dashboard/profile';
//context
import { AuthContext } from '../../../Contexts/AuthContext';
//----------------------------------------------------

const ProfilePage = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>{'Profile'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <ProfileCardAvatar user={user} />
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
