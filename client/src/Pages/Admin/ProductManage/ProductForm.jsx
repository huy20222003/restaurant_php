//@mui
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ButtonBase,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
//context
import { useProduct } from '../../../hooks/context';
//toast
import { toast } from 'react-toastify';
//component
import {
  ProductFormDetail,
  ProductFormImage,
  ProductFormProperty,
  ProductFormPrice,
} from '../../../section/admin/product';

//-----------------------------------------

const StyledButtonBaseCreate = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
  }
`;

const ProductForm = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    subDescription: '',
    description: '',
    image_url: [],
    quantity: '',
    category: '',
    size: [],
    color: [],
    price: '',
    priceSale: '',
    status: '',
  });

  const { handleCreateProduct } = useProduct();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const createData = await handleCreateProduct(productData);
      if (!createData.success) {
        toast.error(createData.message);
      } else {
        toast.success(createData.message);
        navigate('/admin/product-manage');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  return (
    <form style={{ marginTop: '2rem' }} onSubmit={handleCreate}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography variant="h6">{'Create Product'}</Typography>
          <Typography variant="body2">
            Title, short description, image...
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} component={Card}>
            <ProductFormDetail
              productData={productData}
              setProductData={setProductData}
            />
            <ProductFormImage
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Typography variant="h6">Properties</Typography>
          <Typography variant="body2">
            Additional functions and attributes...
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductFormProperty
            productData={productData}
            setProductData={setProductData}
          />
        </Grid>
        <Grid item md={4}>
          <Typography variant="h6">Price</Typography>
          <Typography variant="body2">Price related inputs</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductFormPrice
            productData={productData}
            setProductData={setProductData}
          />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item xs={12} md={8}>
          <Stack sx={{ gap: '24px', padding: '24px', alignItems: 'flex-end' }}>
            <StyledButtonBaseCreate sx={{ maxWidth: '130px' }} type="submit">
              {'Create Product'}
            </StyledButtonBaseCreate>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
