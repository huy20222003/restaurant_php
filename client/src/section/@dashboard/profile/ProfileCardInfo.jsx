//@mui
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
//context
import { useAuth, useUser } from '../../../hooks/context';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
//-----------------------------------------------

const ProfileCardInfo = () => {
  const {
    authState: { user },
  } = useAuth();
  const { handleUpdateDetail } = useUser();
  const [updateForm, setUpdateForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    shipAddress: user?.shipAddress || '',
    address: user?.address || '',
  });

  const handleChange = useCallback((e) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);


  const handleSubmit = useCallback(async()=> {
    try {
      const updateData = await handleUpdateDetail(updateForm);
      if(updateData.success) {
        toast.success('Update successful');
      } else {
        toast.error('Update faield!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  }, [handleUpdateDetail, updateForm]);

  const { fullName, username, email, phoneNumber, shipAddress, address } =
    updateForm;

  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={0}>
        <CardHeader>
          <Typography variant="body2">Profile</Typography>
          <Typography variant="subtitle2">The content can be edit</Typography>
        </CardHeader>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="fullName"
                  label="Fullname"
                  value={fullName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="username"
                  label="Username"
                  value={username}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="email"
                  label="Email"
                  value={email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  name="shipAddress"
                  label="Ship Address"
                  value={shipAddress}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  name="address"
                  label="Address"
                  value={address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="medium" variant="contained" onClick={handleSubmit}>
            Save Detail
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
};

export default ProfileCardInfo;
