import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Box,
} from '@mui/material';
//mui icon
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
//cookie
import Cookies from 'js-cookie';
// components
import Iconify from '../../../Components/User/iconify';
//context
import {useAuth} from '../../../hooks/context'
//sweetalert
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  document.title = 'Login';
  const { loginUser } = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  const handleChangeLoginForm = (e)=> {
    setLoginFormData({...loginFormData, [e.target.name]: e.target.value});
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const loginData = await loginUser(loginFormData);
      if (!loginData.success) {
        Swal.fire('Failed', 'Login Failed', 'error');
      } else {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
        Cookies.set('user', loginData.accessToken, { expires: expiration });
        Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
        Swal.fire('Success', 'Login Success!', 'success');
        navigate('/dashboard/app');
      }
    } catch (error) {
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={loginFormData.username}
          onChange={handleChangeLoginForm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          label="Password"
          required
          fullWidth
          value={loginFormData.password}
          onChange={handleChangeLoginForm}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Box><Checkbox name="remember" label="Remember me" />Remember me</Box>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );
}
