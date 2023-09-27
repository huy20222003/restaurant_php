//@mui
import { Box, Container, Typography } from '@mui/material';
//component
import {
  Notification,
  UpdatePassword,
} from '../../../section/@dashboard/setting';
//-----------------------------------------------------------

const SettingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box component={'main'} sx={{ flexGrow: 1, py: '4rem' }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ fontSize: '2rem', lineHeight: 1.2, mb: '0.5rem' }}
          >
            Setting
          </Typography>
          <Notification />
          <UpdatePassword />
        </Container>
      </Box>
    </div>
  );
};

export default SettingPage;
