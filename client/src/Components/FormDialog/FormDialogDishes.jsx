import { useContext, useState, useCallback, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { CommonContext } from '../../Contexts/CommonContext';
import {CategoryContext} from '../../Contexts/CategoryContext';

const FormDialogDishes = ({ fields, handleCreate }) => {
  const { openFormDialog, setOpenFormDialog } = useContext(CommonContext);
  const {categoryState: {categories}, handleGetAllCategory} = useContext(CategoryContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image_url: '',
  });

  useEffect(()=> {
    handleGetAllCategory();
  }, [handleGetAllCategory]);

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
    const updatedFormData = {
      ...formData,
      // image_url: selectedImage,
    };
    handleCreate(updatedFormData);
    handleClose();
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      image_url: '',
    });
    setSelectedImage(null); // Clear the selected image
  };

  // const handleChangeFile = useCallback(async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.onerror = () => {
  //       toast.error('Error occurred while reading the file.');
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setSelectedImage(null);
  //   }
  // }, []);

  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category._id} value={category._id}>
        {category.name}
      </MenuItem>
    ));
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          Thêm món ăn
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
          <FormControl
            autoFocus
            sx={{ margin: '2rem 0', display: 'block' }}
          >
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={formData.category}
              label="Age"
              sx={{ minWidth: 200 }}
              onChange={handleFieldChange}
              required
            >
              {renderCategories()}
            </Select>
          </FormControl>
          {/* <input
            type="file"
            accept="image/*"
            name="image_url"
            onChange={handleChangeFile}
            required
          /> */}
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
            Thêm món ăn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogDishes;
