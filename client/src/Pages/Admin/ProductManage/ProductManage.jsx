import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Typography,
  Popover,
  MenuItem,
  Menu,
} from '@mui/material';
//icon
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//context
import { useProduct } from '../../../hooks/context';
//component
import Iconify from '../../../Components/User/iconify';
//sweetalert
import Swal from 'sweetalert2';
//---------------------------------------------------------

const ProductManage = () => {
  const {
    productsState: { products },
    handleDeleteProduct,
  } = useProduct();

  const navigate = useNavigate();

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
    { field: 'name', headerName: 'Tên', type: 'String', width: 160 },
    { field: 'description', headerName: 'Mô tả', type: 'String', width: 200 },
    { field: 'category', headerName: 'Danh mục', type: 'String', width: 160 },
    { field: 'price', headerName: 'Giá', type: 'Number', width: 100 },
    { field: 'rate', headerName: 'Đánh giá', type: 'Number', width: 70 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 90,
      renderCell: ActionsCell,
    },
  ];

  function ActionsCell(params) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-label="More"
          aria-controls="menu-actions"
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{ style: { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}
        >
          <Menu
            id="menu-actions"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleView(params.row.id)}>
              <VisibilityIcon sx={{ paddingRight: '0.5rem' }} />
              Xem
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              Sửa
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Xoá
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows = products.map((product) => {
    return {
      id: product?._id,
      image_url: product?.image_url,
      name: product?.name,
      description: product?.description,
      category: product?.category,
      price: product?.price,
      rate: product?.rate,
    };
  });

  const handleView = (productId) => {
    console.log(`View product with ID: ${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = async (productId) => {
    Swal.fire({
      title: 'Delete this product?',
      text: 'Would you like to delete this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteProduct(productId);
          if (response.success) {
            Swal.fire('', 'Delete Successful!', 'success');
          } else {
            Swal.fire('', 'Delete failed!', 'error');
          }
        } catch (error) {
          Swal.fire('', 'Server error!', 'error');
        }
      }
    });
  };

  const handleNavigateCreateProductPage = () => {
    navigate('/admin/product-manage/create');
  };

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', maxWidth: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1, py: '64px' }}>
          <Container sx={{pt: '40px'}}>
            <Stack>
              <Stack
                sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Stack>
                  <Typography variant="h4">Products</Typography>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      mt: '8px',
                    }}
                  >
                    <ButtonBase sx={{ p: '7px 12px' }}>
                      <Iconify
                        icon="material-symbols:upload"
                        sx={{ mr: '0.3rem' }}
                      />
                      Upload
                    </ButtonBase>
                    <ButtonBase sx={{ p: '7px 12px' }}>
                      <Iconify icon="uil:import" sx={{ mr: '0.3rem' }} />
                      Export
                    </ButtonBase>
                  </Stack>
                </Stack>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: '12px' }}
                    onClick={handleNavigateCreateProductPage}
                  >
                    Add
                  </Button>
                </Stack>
              </Stack>
              <Paper elevation={0} sx={{ m: '32px 0 0' }}>
                <DataTable columns={columns} rows={rows} />
              </Paper>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductManage;
