import PropTypes from 'prop-types';
//@mui
import {
  Avatar,
  Box,
  CardContent,
  Paper,
  Typography,
  Divider,
  CardActions,
  FormControlLabel,
  Switch,
} from '@mui/material';
//-------------------------------------------

const DetailCardAvatar = ({ data }) => {
  return (
    <Paper elevation={0}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={data?.avatar}
            alt="Avatar"
            sx={{
              userSelect: 'none',
              width: '5rem',
              height: '5rem',
              mb: '1rem',
              letterSpacing: 0,
            }}
          />
          <Typography variant="h6">{data?.fullName}</Typography>
          <Typography variant="body2">{data?.username}</Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center' }}>
        <input type="file" name="avatarUpdate" accept="image/*" hidden={true} />
        <FormControlLabel
          disabled
          control={<Switch defaultChecked color="primary" />}
          label="Verify"
        />
      </CardActions>
    </Paper>
  );
};

DetailCardAvatar.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailCardAvatar;
