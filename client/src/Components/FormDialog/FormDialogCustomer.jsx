import PropTypes from 'prop-types';
//@mui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
//context
import { useCommon } from '../../hooks/context';

//-------------------------------------------------------------

const FormDialogCustomer = ({ fields, formData, setFormData, handleCreate }) => {
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
          {'Add Customer'}
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
          <Button variant="contained" size="large" onClick={handleCreate}>
            {'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogCustomer.propTypes = {
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
  handleCreate: PropTypes.func.isRequired,
};

export default FormDialogCustomer;
