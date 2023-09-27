import { useState } from 'react';
import { Menu, Button, MenuItem, Typography } from '@mui/material';
import Iconify from '../../../Components/User/iconify';
//context
import { useProduct } from '../../../hooks/context';

const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectValue, setSelectValue] = useState('newest');
  const { handleSortProduct } = useProduct();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSelectValue = (value) => {
    setSelectValue(value);
    handleSortProduct(selectValue);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={anchorEl ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
          />
        }
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
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
