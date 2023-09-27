import PropTypes from 'prop-types';
//@mui
import {
  Box,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
//-------------------------------------------------------

const DetailCardInfo = ({ fields, data, handleDelete }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={1}>
        <CardHeader>
          <Typography variant="body2">Detail</Typography>
          <Typography variant="subtitle2">The content can be edited</Typography>
        </CardHeader>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              {fields.map((field, index) => (
                <Grid item key={index} xs={12} md={field.gridItemProps}>
                  <InputLabel>{field.label}</InputLabel>
                  <TextField
                    required
                    value={data && data[field.name] || ''}
                    name={field.name}
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{justifyContent: 'flex-end'}}>
          <Button variant="contained" size="medium" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
};

DetailCardInfo.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    fullName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    shipAddress: PropTypes.string,
    address: PropTypes.string,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default DetailCardInfo;
