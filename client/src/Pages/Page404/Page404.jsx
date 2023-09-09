import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Page404 = () => {
  return (
    <>
      <title> 404 Page Not Found </title>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we could not find the page you are looking for. Perhaps you
            have mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          {window.location.href.includes('admin') ? (
            <Button
              to="/auth/admin/login"
              size="large"
              variant="contained"
              component={Link}
            >
              Go to Login Page
            </Button>
          ) : (
            <Button
              to="/auth/login"
              size="large"
              variant="contained"
              component={Link}
            >
              Go to Login Page
            </Button>
          )}
        </StyledContent>
      </Container>
    </>
  );
};

export default Page404;
