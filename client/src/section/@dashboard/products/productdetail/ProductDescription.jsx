import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem } from '@mui/material';
import HTMLReactParser from 'html-react-parser';

const ProductDescription = ({ product }) => {
  const description =
    product?.description && typeof product.description === 'string'
      ? product.description
      : '';

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle1">Product Information</Typography>
      <List>
        <ListItem>
          <Typography variant="body2">Product code: {product?._id}</Typography>
        </ListItem>
      </List>
      <Typography variant="subtitle1">Product Detail</Typography>
      <Typography variant="caption">
        {HTMLReactParser(description)}
      </Typography>
    </Box>
  );
};

ProductDescription.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default ProductDescription;
