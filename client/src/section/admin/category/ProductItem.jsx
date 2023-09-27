import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
//@mui
import { Box, Button, Stack, Typography, Tooltip } from '@mui/material';
import styled from '@emotion/styled';
//mui icon
import AddIcon from '@mui/icons-material/Add';
//context
import { useCategory, useCommon } from '../../../hooks/context';
//sweet alert
import Swal from 'sweetalert2';
//------------------------------------------------------------

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4rem',
  border: `1px solid gray`,
  margin: '0.6rem 0',
  borderRadius: '0.4rem',
  padding: '0.4rem',
  boxShadow: theme.customShadows.card,
  cursor: 'pointer',
  position: 'relative',

  '&:hover .add-button': {
    opacity: 1,
    visibility: 'visible',
    transform: 'scale(1)',
  },
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const ProductItem = ({ product }) => {
  const { handleAddProductToCategory } = useCategory();
  const {setOpenFormDialog} = useCommon();
  const { _id } = useParams();

  const handleAddProduct = async() => {
    try {
      const response = await handleAddProductToCategory({
        productId: product?._id,
        categoryId: _id,
      });
      if (!response.success) {
        Swal.fire('Faield', 'Add Faield', 'error');
      } else {
        Swal.fire('Success', 'Add Success', 'success');
      }
      setOpenFormDialog(false);
    } catch (error) {
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  return (
    <>
      {product !== undefined ? (
        <CustomBox>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack
              sx={{ flexDirection: 'row', gap: '1rem', alignItems: 'center' }}
            >
              <Box
                component={'img'}
                src={product?.image_url}
                sx={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.25rem',
                  objectFit: 'cover',
                }}
              ></Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {product?.name}
              </Typography>
            </Stack>
            <Tooltip title="Add Product" placement="top">
              <Button
                className="add-button"
                variant="text"
                onClick={handleAddProduct}
                sx={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
                  transform: 'scale(0.8)',
                  '&:hover': {
                    color: 'primary',
                    transform: 'scale(1)',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: '1.8rem' }} />
              </Button>
            </Tooltip>
          </Stack>
        </CustomBox>
      ) : (
        <Box>
          <Typography variant='body2'>Product not found!</Typography>
        </Box>
      )}
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image_url: PropTypes.array,
    name: PropTypes.string,
  }),
};

export default ProductItem;
