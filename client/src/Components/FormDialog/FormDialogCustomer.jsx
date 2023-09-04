import { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { CommonContext } from '../../Contexts/CommonContext';

const FormDialogCustomer = ({ fields, handleCreate }) => {
  const { openFormDialog, setOpenFormDialog } = useContext(CommonContext);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
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
    setFormData({ fullName: '', username: '', email: '', password: '' });
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          Thêm khách hàng
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
            Huỷ
          </Button>
          <Button variant="contained" size="large" onClick={handlecreateData}>
            Thêm khách hàng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogCustomer;
