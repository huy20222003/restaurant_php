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

const AdminLogin = () => {
    const { loginAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
  
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
          setAlertInfo({
            type: 'error',
            message: loginData.message
          });
          setOpen(true);
        } else {
          setAlertInfo({
            type: 'success',
            message: loginData.message
          });
          setOpen(true);
          navigate('/admin/dashboard');
        }
      } catch (error) {
        setAlertInfo({
          type: 'error',
          message: 'Server Error'
        });
        setOpen(true);
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
