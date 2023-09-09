import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../Components/User/iconify';
import { ProductsContext } from '../../../Contexts/ProductsContext';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const { handleSearchProduct } = useContext(ProductsContext);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      navigate('products'); // Use the correct route path
      handleSearchProduct(searchValue);
      setSearchValue('');
      handleClose();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open ? (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        ) : (
          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            <StyledSearchbar>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder="Search…"
                name="q"
                value={searchValue}
                onChange={handleChangeSearchValue}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <Button variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </StyledSearchbar>
          </Slide>
        )}
      </div>
    </ClickAwayListener>
  );
}
