import { Paper, Box, Typography } from '@mui/material';

const CustomerDetail = () => {
  const user = JSON.parse(sessionStorage.getItem('data'));
    console.log(user)

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginBottom: '5rem' }}
      >
        Thông tin chi tiết
      </Typography>
      <Paper elevation={3}>
        <Typography>ID khách hàng</Typography>
        <Typography>{user?._id}</Typography>
      </Paper>
    </Box>
  );
};

export default CustomerDetail;
