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

const FormDialogCategory = ({ fields, handleCreate }) => {
  const { openFormDialog, setOpenFormDialog } = useContext(CommonContext);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateData = () => {
    handleCreate(formData);
    handleClose();
    setFormData({});
  };

  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
        Thêm danh mục
      </DialogTitle>
      <DialogContent>
        {fields.map((field, index) => (
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
            multiline
            rows={field.row}
          />
        ))}
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
        <Button variant="contained" size="large" onClick={handleCreateData}>
          Thêm danh mục
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogCategory;
