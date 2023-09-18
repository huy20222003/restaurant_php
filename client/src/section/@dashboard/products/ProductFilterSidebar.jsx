import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../Components/User/iconify';
import Scrollbar from '../../../Components/User/scrollbar';
//toast
import { toast } from 'react-toastify';
//
import { useState, useContext } from 'react';
//context
import { ProductsContext } from '../../../Contexts/ProductsContext';

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = [
  'Tất cả',
  'Đồ uống',
  'Đồ ăn nhanh',
  'Món cay',
  'Món chay',
];
export const FILTER_RATING_OPTIONS = [
  'Trên 4 sao',
  'Trên 3 sao',
  'Trên 2 sao',
  'Trên 1 sao',
];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Dưới 100k' },
  { value: 'between', label: 'Từ 100k - 200k' },
  { value: 'above', label: 'Trên 200k' },
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
}) {
  const [categoryValue, setCategoryValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [starValue, setStarValue] = useState();
  const { handleFilterProduct } = useContext(ProductsContext);

  const handleChangeCategoryValue = (e) => {
    setCategoryValue(e.target.value);
    handleFilter();
  };

  const handleChangePriceValue = (e) => {
    setPriceValue(e.target.value);
    handleFilter();
  };

  const handleChangeStarValue = (e) => {
    setStarValue(e.target.value);
    handleFilter();
  };

  const handleFilter = async () => {
    try {
      const filterRes = await handleFilterProduct(
        categoryValue,
        priceValue,
        starValue
      );
      if (!filterRes.success) {
        toast.error(filterRes.message);
      } else {
        toast.success(filterRes.message);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar sx={{ overflowY: 'scroll' }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                    onChange={handleChangeCategoryValue}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                    onChange={handleChangePriceValue}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    onChange={handleChangeStarValue}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label={item}
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
