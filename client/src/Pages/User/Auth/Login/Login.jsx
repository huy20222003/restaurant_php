import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useReponsive';
// components
// import Logo from '../../../../Components/User/logo';
import Iconify from '../../../../Components/User/iconify';
// sections
import LoginForm from '../../../../section/auth/LoginForm';
//Context
import { useCommon } from '../../../../hooks/context';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Login = () => {
  const mdUp = useResponsive('up', 'md');
  const { handleEvolvingFunctionality } = useCommon();

  return (
    <>
      <Helmet>
        <title> Signin </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="signin"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sigin
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Do not have an account? {''}
              <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                Signup
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleEvolvingFunctionality}
              >
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleEvolvingFunctionality}
              >
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleEvolvingFunctionality}
              >
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default Login;
