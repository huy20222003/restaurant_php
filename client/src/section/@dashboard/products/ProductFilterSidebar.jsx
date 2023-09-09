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
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../Components/User/iconify';
import Scrollbar from '../../../Components/User/scrollbar';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Đồ ăn nhanh', 'Đồ uống', 'Món cay'];
export const FILTER_CATEGORY_OPTIONS = ['Tất acr', 'Đồ uống', 'Đồ ăn nhanh', 'Món cay', 'Món chay'];
export const FILTER_RATING_OPTIONS = ['Trên 4 sao', 'Trên 3 sao', 'Trên 2 sao', 'Trên 1 sao'];
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

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
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
                    label="& Up"
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
