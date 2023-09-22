//@mui
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
//sweetalert
import Swal from 'sweetalert2';

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

  const [isEdit, setIsEdit] = useState(false);
  const { _id } = useParams();
  const { handleCreateProduct, handleGetOneProduct, handleUpdateProduct } =
    useProduct();

  useEffect(() => {
    const fetchData = async () => {
      if (_id) {
        setIsEdit(true);
        try {
          const response = await handleGetOneProduct(_id);
          setProductData(response.product);
        } catch (error) {
          toast.error('Server Error');
        }
      }
    };

    fetchData();
  }, [_id, handleGetOneProduct]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const updateData = await handleUpdateProduct(_id ,productData);
        if (!updateData.success) {
          Swal.fire('Failed', 'Update Product Failed', 'error');
        } else {
          Swal.fire('Successful', 'Update Product Successful', 'success');
          navigate('/admin/product-manage');
        }
      } else {
        const createData = await handleCreateProduct(productData);
        if (!createData.success) {
          Swal.fire('Failed', 'Update Product Failed', 'error');
        } else {
          Swal.fire('Successful', 'Create Product Successful', 'success');
          navigate('/admin/product-manage');
        }
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };
  

  return (
    <form style={{ marginTop: '2rem' }} onSubmit={handleClick}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography variant="h6">
            {isEdit ? 'Edit Product' : 'Create Product'}
          </Typography>
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
              {isEdit ? 'Edit Product' : 'Create Product'}
            </StyledButtonBaseCreate>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
