import { Paper, Box, Typography, List, ListItem } from '@mui/material';

const CustomerDetail = () => {
  const user = JSON.parse(sessionStorage.getItem('data'));

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: '5rem' }}
      >
        Thông tin chi tiết
      </Typography>
      <Paper elevation={3}>
        <Box sx={{ p: '2rem' }}>
          <List>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  ID khách hàng
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?._id}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  Họ và tên
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?.fullName}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  Tên tài khoản
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?.username}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  Email
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?.email}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  Phone
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?.phoneNumber}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, lineHeight: 2, fontSize: '1.4rem' }}
                >
                  Địa chỉ
                </Typography>
                <Typography
                  sx={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {user?.address}
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomerDetail;
