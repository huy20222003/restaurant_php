import { useNavigate } from 'react-router-dom';
//mui
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';
//mui icon
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//cookie
import Cookies from 'js-cookie';
//context
import {useAuth} from '../../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//-----------------------------------------------------------------------------

const defaultTheme = createTheme();

const AdminLogin = () => {
  document.title = 'Login';
    const { loginAdmin, loadUser } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const loginForm = {
        username: data.get('username'),
        password: data.get('password'),
      };
      try {
        const loginData = await loginAdmin(loginForm);
        if (!loginData.success) {
          Swal.fire('Failed', 'Login Failed', 'error');
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', loginData.accessToken, { expires: expiration });
          Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
          await loadUser();
          Swal.fire('Successful', 'Login Successful', 'success');
          navigate('/admin');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 30 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminLogin;
