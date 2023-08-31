import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  Collapse,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthContext';
import Copyright from '../../../../Components/Copyright';

const defaultTheme = createTheme();

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('password') !== data.get('confirmPassword')) {
      setAlertInfo({
        type: 'error',
        message: 'Password is not math',
      });
      setOpen(true);
    } else {
      try {
        const formData = {
          fullName: data.get('fullName'),
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
        };
        const registerData = await registerUser(formData);
        console.log(registerData);
        if (!registerData.success) {
          setAlertInfo({
            type: 'error',
            message: registerData.message,
          });
          setOpen(true);
        } else {
          setAlertInfo({
            type: 'success',
            message: registerData.message,
          });
          setOpen(true);
          navigate('/auth/login');
        }
      } catch (error) {
        setAlertInfo({
          type: 'error',
          message: 'Server Error',
        });
        setOpen(true);
      } 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Collapse in={open} sx={{ position: 'relative' }}>
        <Alert
          severity={alertInfo.type}
          onClose={() => {
            setOpen(false);
          }}
        >
          <AlertTitle>{alertInfo.type}</AlertTitle>
          {alertInfo.message}
        </Alert>
      </Collapse>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?food)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="FullName"
                name="fullName"
                autoComplete="fullName"
                autoFocus
              />
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 30 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/auth/login"
                    variant="body2"
                    sx={{ textDecoration: 'none' }}
                  >
                    {'Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
