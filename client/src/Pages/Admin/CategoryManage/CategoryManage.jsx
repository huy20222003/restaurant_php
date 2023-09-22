import { useState, useEffect, useCallback } from 'react';
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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import Iconify from '../../../Components/User/iconify';
import DataTable from '../../../Components/Admin/DataTable';
import FormDialogCategory from '../../../Components/FormDialog/FormDialogCategory';
import { useCategory, useCommon } from '../../../hooks/context';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CategoryManage = () => {
  const {
    categoryState: { categories },
    handleGetOneCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategory();

  const { setOpenFormDialog } = useCommon();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleView = useCallback((categoryId) => {
    console.log(`View category with ID: ${categoryId}`);
  }, []);

  const handleEdit = useCallback(
    async (categoryId) => {
      const response = await handleGetOneCategory(categoryId);
      if (response.success) {
        setFormData(response.category);
      }
      setIsEdit(true);
    },
    [handleGetOneCategory]
  );

  const handleSave = async () => {
    try {
      if (isEdit) {
        const editData = await handleUpdateCategory(formData?._id, formData);
        if (!editData.success) {
          toast.error('Category update failed');
        } else {
          toast.success('Category update successful');
        }
      } else {
        const createData = await handleCreateCategory(formData);
        if (!createData.success) {
          toast.error('Add category failed');
        } else {
          toast.success('Add category successful');
        }
      }
      setFormData({});
      setOpenFormDialog(false);
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleDelete = useCallback(
    async (categoryId) => {
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
    },
    [handleDeleteCategory]
  );

  useEffect(() => {
    if (isEdit) {
      setOpenFormDialog(true);
    }
  }, [isEdit, formData._id, setOpenFormDialog]);

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
    categories.map(({ _id, name, description }) => ({
      id: _id,
      name,
      description,
      quantity: categories.length,
    }));

  const fields = [
    { name: 'name', label: 'Tên', type: 'text', row: 1 },
    { name: 'description', label: 'Mô tả', type: 'text', row: 5 },
  ];

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
          <Container sx={{ pt: '40px' }}>
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
              <FormDialogCategory
                fields={fields}
                isEdit={isEdit}
                formData={formData}
                setFormData={setFormData}
                handleSave={handleSave}
              />
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
