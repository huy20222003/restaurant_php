import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
//cookie
import Cookies from 'js-cookie';
// components
import Iconify from '../../../Components/User/iconify';
import { AuthContext } from '../../../Contexts/AuthContext';
//sweetalert
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  document.title = 'Đăng ký tài khoản';
  const { registerUser } = useContext(AuthContext);
  const [registerFormData, setRegisterFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChangeLoginForm = (e)=> {
    setRegisterFormData({...registerFormData, [e.target.name]: e.target.value});
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (registerFormData.password !== registerFormData.confirmPassword) {
      Swal.fire('Error', 'Password do not match!', 'error');
    } else {
      try {
        const registerData = await registerUser(registerFormData);
        if (!registerData.success) {
          Swal.fire('Failed', 'Please check the information again!', 'error');
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', registerData.accessToken, {
            expires: expiration,
          });
          Cookies.set('refresh', registerData.refreshToken, { expires: 365 });
          Swal.fire('Success', 'Sign up Success!', 'success');
          navigate('/auth/login');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
      <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="FullName"
          name="fullName"
          autoComplete="fullName"
          autoFocus
          value={registerFormData.fullName}
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
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={registerFormData.username}
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
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={registerFormData.email}
          onChange={handleChangeLoginForm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          label="Password"
          required
          fullWidth
          value={registerFormData.password}
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
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          required
          fullWidth
          value={registerFormData.confirmPassword}
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
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Signup
      </LoadingButton>
    </>
  );
}
