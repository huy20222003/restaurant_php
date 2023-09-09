//@mui
import { Box, Typography, List, ListItem } from '@mui/material';
//-----------------------------------------------

const ProductDescription = ({ product }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6">Product Information</Typography>
      <List>
        <ListItem>
          <Typography variant="body2">Product code: {product?._id}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Category: {product?.category}</Typography>
        </ListItem>
      </List>
      <Typography variant="h6">Product Detail</Typography>
      <List>
        <ListItem>
          <Typography variant="body2">Description: {product?.description}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Ingredient: {product?._id}</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProductDescription;
