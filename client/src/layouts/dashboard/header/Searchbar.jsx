import { useState, startTransition, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import { styled } from '@mui/material/styles';
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';
//util
import { bgBlur } from '../../../utils/cssStyles';
//component
import Iconify from '../../../Components/User/iconify';
//context
import { useProduct } from '../../../hooks/context';

//----------------------------------------------------------
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

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const { handleSearchProduct } = useProduct();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        await handleSearchProduct(searchValue);
        console.log(123);
        // if (response.success) {
        //   navigate('products');
        //   setSearchValue('');
        //   handleClose();
        // }
      } catch (error) {
        console.log('Error');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, searchValue, handleSearchProduct, navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSearchValue = (e) => {
    startTransition(() => setSearchValue(e.target.value));
  };

  const handleSearch = () => {
    startTransition(() => {
      setOpen(false);
      setSearchValue('');
    });
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
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
              >
                Search
              </Button>
            </StyledSearchbar>
          </Slide>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Searchbar;
