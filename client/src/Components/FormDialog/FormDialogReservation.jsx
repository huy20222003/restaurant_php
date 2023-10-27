import PropTypes from 'prop-types';
//@mui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//CommonContext
import { useCommon } from '../../hooks/context';
//tableConfig
import tableConfig from '../../config/tableConfig';
//---------------------------------------------------------------------------

const FormDialogReservation = ({ formik, handleSave, isEdit }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {isEdit ? 'Update Reservation' : 'Add Reservation'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            value={formik.values.fullName || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
            required
          />
          <FormControl
            fullWidth
            autoFocus
            sx={{ margin: '2rem 0', display: 'block' }}
          >
            <InputLabel id="tableName-label">Table Name</InputLabel>
            <Select
              labelId="tableName-label"
              id="tableName"
              name="tableName"
              value={formik.values.tableName || ''}
              label="Table Name"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.tableName && formik.errors.tableName}
              helperText={formik.touched.tableName && formik.errors.tableName}
            >
              {tableConfig.map((table) => (
                <MenuItem
                  key={table.name}
                  disabled={table.isReservation ? true : false}
                  value={table.name}
                >
                  {table.name} ({table.description})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Reservation Date"
                value={formik.values.reservationDate || null}
                onChange={(date) => {
                  formik.setFieldValue('reservationDate', date);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: 'red', borderColor: 'red' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={handleSave}>
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogReservation.propTypes = {
  formik: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default FormDialogReservation;
