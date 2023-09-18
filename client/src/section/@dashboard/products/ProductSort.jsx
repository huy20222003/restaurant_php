import { useState, useContext } from 'react';
import { Menu, Button, MenuItem, Typography } from '@mui/material';
import Iconify from '../../../Components/User/iconify';
//context
import {ProductsContext} from '../../../Contexts/ProductsContext';

const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectValue, setSelectValue] = useState('newest');
  const {productsState: {products}} = useContext(ProductsContext);
  const [product, setProduct] = useState(products);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSelectValue = (value) => {
    setSelectValue(value);
     // Sắp xếp danh sách sản phẩm dựa trên giá
     if (value === 'priceDesc') {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProduct(sortedProducts);
    } else if (value === 'priceAsc') {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProduct(sortedProducts);
    }
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={anchorEl ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {selectValue}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleChangeSelectValue(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
