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
//CommonContext
import { useCommon } from '../../hooks/context';
//---------------------------------------------------------------------------

const FormDialogEmployee = ({
  fields,
  formData,
  setFormData,
  handleSave,
  isEdit,
}) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          {fields.map((field, index) => {
            return (
              <TextField
                key={index}
                autoFocus={index === 0}
                margin="dense"
                id={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                fullWidth
                value={formData[field.name] || ''}
                onChange={handleFieldChange}
                required
              />
            );
          })}
          <FormControl autoFocus sx={{ margin: '2rem 0', display: 'block' }}>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="position"
              value={formData.position || 'employee'}
              label="Vị trí"
              onChange={handleFieldChange}
              sx={{ minWidth: 400 }}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'employee'}>Employee</MenuItem>
            </Select>
          </FormControl>
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

FormDialogEmployee.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      row: PropTypes.number,
    })
  ).isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default FormDialogEmployee;
