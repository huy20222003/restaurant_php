import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  ButtonBase,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//@mui icon
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//component
import DataTable from '../../../Components/Admin/DataTable';
import FormDialogAddProduct from '../../../Components/FormDialog/FormDialogAddProduct';
//context
import { useCommon, useProduct, useCategory } from '../../../hooks/context';
//htmlparse
import HTMLReactParser from 'html-react-parser';
//sweetalert2
import Swal from 'sweetalert2';
//-----------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const CategoryDetail = () => {
  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  const {
    categoryState: { categories, category },
    handleGetAllCategory,
    handleGetOneCategory,
    handleDeleteCategory,
  } = useCategory();

  useEffect(() => {
    handleGetAllCategory();
  }, [handleGetAllCategory]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  const [categoryInfo, setCategoryInfo] = useState(category);

  const { _id } = useParams();

  const { setOpenFormDialog } = useCommon();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetOneCategory(_id);
        setCategoryInfo(response.category);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchData();
  }, [_id, handleGetOneCategory]);

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };
  const handleBack = () => {
    history.back();
  };

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    {
      field: 'image_url',
      headerName: 'Ảnh',
      type: 'String',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: '60%', height: '60%' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', type: 'String', width: 160 },
    {
      field: 'description',
      headerName: 'Description',
      type: 'String',
      width: 200,
    },
    { field: 'category', headerName: 'Category', type: 'String', width: 160 },
    { field: 'price', headerName: 'Price', type: 'Number', width: 100 },
    { field: 'rate', headerName: 'Rate', type: 'Number', width: 70 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: ActionsCell,
    },
  ];

  const productsFilter = products.filter((product) => {
    return product.category === _id;
  });

  const rows = productsFilter.map((product) => {
    const description = HTMLReactParser(
      product?.description && typeof product.description === 'string'
        ? product.description
        : ''
    );
    const categoryName = categories.find(
      (item) => item?._id == product?.category
    );

    return {
      id: product?._id,
      image_url: product?.image_url,
      name: product?.name,
      description: description.props.children,
      category: categoryName.name,
      price: product?.price,
      rate: product?.rate,
    };
  });

  function ActionsCell(params) {
    return (
      <Button
        variant="text"
        color="info"
        size="small"
        onClick={() => handleDelete(params.row.id)}
      >
        Switch
      </Button>
    );
  }

  const handleDelete = useCallback(
    async () => {
      Swal.fire({
        title: 'Delete this category?',
        text: 'Would you like to delete this category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, of course!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await handleDeleteCategory(_id);
            if (response.success) {
              Swal.fire('', 'Delete Successful!', 'success');
              navigate('/admin/category-manage');
            } else {
              Swal.fire('', 'Delete failed!', 'error');
            }
          } catch (error) {
            Swal.fire('', 'Server error!', 'error');
          }
        }
      });
    },
    [_id, handleDeleteCategory, navigate]
  );

  return (
    <Box sx={{ pt: '64px' }}>
      <Container>
        <Stack
          sx={{
            gap: '8px',
            alignItems: 'center',
            flexDirection: 'row',
            mb: '4rem',
          }}
        >
          <ButtonBase onClick={handleBack}>
            <ArrowBackIosIcon sx={{ fontSize: '12px' }} />
          </ButtonBase>
          {categoryInfo && (
            <Stack sx={{ gap: '4px' }}>
              <Stack
                sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}
              >
                <Typography variant="h6">
                  Category #{categoryInfo?._id}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <StyledPaper>
          <Stack sx={{ gap: '12px' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: '1rem 1rem 0',
              }}
            >
              <Stack>
                <Typography variant="subtitle1">
                  Name: {categoryInfo?.name}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', gap: '12px' }}>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleOpenFormDialog}
                >
                  Add Product
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
            <FormDialogAddProduct />
            <Box sx={{ p: '1.5rem' }}>
              <DataTable columns={columns} rows={rows} />
            </Box>
          </Stack>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default CategoryDetail;
