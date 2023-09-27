import { useState } from 'react';
//@mui
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
//context
import { useUser } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//component
import Iconify from '../../../Components/User/iconify';
//---------------------------------------------------------

const UpdatePassword = () => {
  const { handleUpdatePasswordUser } = useUser();
  const [updateForm, setUpdateForm] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const { newPassword, confirmNewPassword } = updateForm;

  const handleUpdate = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Swal.fire('Error', 'Password do not match', 'error');
      } else {
        const response = await handleUpdatePasswordUser({ newPassword });
        if (!response.success) {
          Swal.fire('Failed', 'Update password failed', 'error');
        } else {
          Swal.fire('Success', 'Update password success', 'success');
        }
      }
      setUpdateForm({ newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  return (
    <form style={{ marginBottom: '1rem' }}>
      <Paper elevation={1} sx={{ borderRadius: '1rem' }}>
        <Box
          sx={{
            display: 'flex',
            p: '2rem 1.5rem 1rem',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Password</Typography>
          <Typography variant="body2">Update password</Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: '1rem',
          }}
        >
          <FormControl sx={{ my: '0.5rem' }}>
            <TextField
              name="newPassword"
              label="Password"
              fullWidth
              value={newPassword}
              onChange={handleChange}
              sx={{ maxWidth: { xs: '100%', sm: '100%', md: '50%' } }}
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
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ my: '0.5rem' }}>
            <TextField
              name="confirmNewPassword"
              label="Password (Confirm)"
              fullWidth
              value={confirmNewPassword}
              onChange={handleChange}
              sx={{ maxWidth: { xs: '100%', sm: '100%', md: '50%' } }}
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
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box
          sx={{
            p: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            size="medium"
            color="primary"
            variant="contained"
            sx={{ p: '0.5rem 1.25rem' }}
            onClick={handleUpdate}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default UpdatePassword;
