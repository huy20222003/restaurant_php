import { useContext, useState } from 'react';
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
import { CommonContext } from '../../Contexts/CommonContext';

const FormDialogEmployee = ({ fields, handleCreate }) => {
  const { openFormDialog, setOpenFormDialog } = useContext(CommonContext);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    position: '', // Ensure this is initially defined
    salary: '',
    password: '',
  });

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

  const handlecreateData = () => {
    handleCreate(formData);
    handleClose();
    setFormData({
      ...formData,
      position: '', // Reset position after submission if needed
    });
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          Thêm nhân viên
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
            <InputLabel id="demo-simple-select-label">Vị trí</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="position"
              value={formData.position} // Use formData.position here
              label="Vị trí"
              onChange={handleFieldChange}
              sx={{ minWidth: 400 }}
            >
              <MenuItem value={'admin'}>Quản trị viên</MenuItem>
              <MenuItem value={'employee'}>Nhân viên</MenuItem>
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
            Huỷ
          </Button>
          <Button variant="contained" size="large" onClick={handlecreateData}>
            Thêm nhân viên
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogEmployee;
