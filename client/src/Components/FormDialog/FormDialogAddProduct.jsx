import { useState, useTransition } from 'react';
import { useParams } from 'react-router-dom';
//@mui
import {
  CircularProgress,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material';
//mui icon
import SearchIcon from '@mui/icons-material/Search';
//context
import { useCommon, useProduct } from '../../hooks/context';
//component
import { ProductItem } from '../../section/admin/category';
//Loader
import Loader from '../../Components/Loader';
//----------------------------------------------------------------------

const FormDialogAddProduct = () => {
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const {
    productsState: { products },
  } = useProduct();
  const [searchValue, setSearchValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSearching, setIsSearching] = useState(false);

  const { _id } = useParams();

  const productsFilter = products.filter((product) => {
    return product?.category !== _id;
  });

  const handleChange = (e) => {
    startTransition(() => setSearchValue(e.target.value));
    if (e.target.value !== '') {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const productsSearch = productsFilter.filter((product) => {
    return product?.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogContent
        sx={{ width: '35rem', height: '30rem', borderRadius: '1rem' }}
      >
        <TextField
          name="searchValue"
          placeholder="Search Product"
          autoFocus
          fullWidth
          value={searchValue}
          onChange={handleChange}
          onBlur={() => setIsSearching(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {isSearching ? <CircularProgress size={24} /> : <SearchIcon />}
              </InputAdornment>
            ),
          }}
        />

        {productsSearch &&
          productsSearch.map((product) => {
            return (
              <div key={product?._id}>
                {isPending ? <Loader /> : <ProductItem product={product} />}
              </div>
            );
          })}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialogAddProduct;
