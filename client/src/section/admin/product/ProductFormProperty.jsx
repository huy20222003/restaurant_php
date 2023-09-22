import PropTypes from 'prop-types';
//@mui
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
//context
import { useCategory } from '../../../hooks/context';

//-----------------------------------------------------------

const ProductFormProperty = ({ productData, setProductData }) => {
  const {
    categoryState: { categories },
  } = useCategory();

  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category._id} value={category._id}>
        {category.name}
      </MenuItem>
    ));
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value.split('\n').map((size) => size.trim());
    setProductData({
      ...productData,
      size: newSize,
    });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value.split('\n').map((color) => color.trim());
    setProductData({
      ...productData,
      color: newColor,
    });
  };

  return (
    <>
      <Paper elevation={0} component={Card}>
        <Stack sx={{ gap: '24px', padding: '24px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={productData.status}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="quantity"
                label="Quantity"
                fullWidth
                value={productData?.quantity || ''}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    quantity: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  value={productData?.category || ''}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      category: e.target.value,
                    })
                  }
                >
                  {renderCategories()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="size"
                label="Sizes"
                fullWidth
                multiline
                rows={3}
                value={productData?.size.join('\n') || ''}
                onChange={handleSizeChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="color"
                label="Colors"
                fullWidth
                multiline
                rows={3}
                value={productData?.color.join('\n') || ''}
                onChange={handleColorChange}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
};

ProductFormProperty.propTypes = {
  productData: PropTypes.object.isRequired,
  setProductData: PropTypes.func.isRequired,
};

export default ProductFormProperty;
