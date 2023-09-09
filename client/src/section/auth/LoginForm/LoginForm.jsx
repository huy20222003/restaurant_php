import { useState, useContext } from 'react';
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
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// components
import Iconify from '../../../Components/User/iconify';
import { AuthContext } from '../../../Contexts/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  document.title = 'Đăng nhập tài khoản';
  const { loginUser } = useContext(AuthContext);
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
        toast.warning('Vui lòng kiểm tra lại thông tin!');
      } else {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
        Cookies.set('user', loginData.accessToken, { expires: expiration });
        Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
        toast.success('Đăng nhập tài khoản thành công!');
        navigate('/dashboard/app');
      }
    } catch (error) {
      toast.error('Máy chủ đã xảy ra lỗi!');
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
          label="Tên đăng nhập"
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
          label="Mật khẩu"
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
        <Box><Checkbox name="remember" label="Remember me" />Nhớ tôi</Box>
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
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
