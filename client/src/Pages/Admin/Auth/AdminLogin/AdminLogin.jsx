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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';
import { AuthContext } from '../../../../Contexts/AuthContext';
import Copyright from '../../../../Components/Copyright';

const defaultTheme = createTheme();

const AdminLogin = () => {
  document.title = 'Đăng nhập tài khoản Admin';
    const { loginAdmin } = useContext(AuthContext);
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
          toast.error(loginData.message);
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', loginData.accessToken, { expires: expiration });
          Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
          toast.success(loginData.message);
          navigate('/admin');
        }
      } catch (error) {
        toast.error('Server Error');
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default AdminLogin;
