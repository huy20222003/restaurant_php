//@mui
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

//---------------------------------------------------------

const Notification = () => {
  return (
    <form style={{marginBottom: '0.5rem'}}>
      <Paper elevation={1} sx={{ borderRadius: '1.25rem' }}>
        <Box
          sx={{
            display: 'flex',
            p: '2rem 1.5rem 1rem',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <Typography variant="body2">Manage the notifications</Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Grid container spacing={2} sx={{ p: '1rem' }}>
          <Grid item xs={12} sm={6} md={4}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Notifications</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Email" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Text Messages"
                />
                <FormControlLabel control={<Checkbox />} label="Phone calls" />
              </FormGroup>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Messages</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Email" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Text Messages"
                />
              </FormGroup>
            </div>
          </Grid>
        </Grid>
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
          >
            Save
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default Notification;
