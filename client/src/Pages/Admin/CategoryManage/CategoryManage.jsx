import { useState } from 'react';
//@mui
import {
  Box,
  Button,
  Paper,
  Typography,
  Popover,
  Menu,
  MenuItem,
  Stack,
  ButtonBase,
  Container,
} from '@mui/material';
//@mui icon
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//iconify
import Iconify from '../../../Components/User/iconify';
//component
import DataTable from '../../../Components/Admin/DataTable';
import FormDialogCategory from '../../../Components/FormDialog/FormDialogCategory';
//context
import { useCategory, useCommon } from '../../../hooks/context';
//toast
import { toast } from 'react-toastify';
//sweet alert
import Swal from 'sweetalert2';

const CategoryManage = () => {
  const {
    categoryState: { categories },
    handleCreateCategory,
    handleDeleteCategory,
  } = useCategory();

  const { setOpenFormDialog } = useCommon();

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 100 },
    { field: 'name', headerName: 'Tên', type: 'String', width: 130 },
    { field: 'description', headerName: 'Mô tả', type: 'String', width: 160 },
    { field: 'quantity', headerName: 'Số lượng', type: 'number', width: 100 },
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

  const rows =
    categories &&
    categories.map((category) => {
      return {
        id: category?._id,
        name: category?.name,
        description: category?.description,
      };
    });

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const fiels = [
    { name: 'name', label: 'Tên', type: 'text', row: 1 },
    { name: 'description', label: 'Mô tả', type: 'text', row: 5 },
  ];

  const handleView = (categoryId) => {
    console.log(`View category with ID: ${categoryId}`);
  };

  const handleEdit = (categoryId) => {
    console.log(`Edit category with ID: ${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: 'Delete this category?',
      text: 'Would you like to delete this category?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteCategory(categoryId);
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

  const handleCreate = async (category) => {
    try {
      const createData = await handleCreateCategory(category);
      if (!createData.success) {
        toast.error(createData.message);
      } else {
        toast.success(createData.message);
      }
    } catch (error) {
      toast.error('Server Error');
    }
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
                  <Typography variant="h4">Categories</Typography>
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
                    onClick={handleOpenFormDialog}
                  >
                    Add
                  </Button>
                </Stack>
              </Stack>
              <FormDialogCategory fields={fiels} handleCreate={handleCreate} />
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

export default CategoryManage;
