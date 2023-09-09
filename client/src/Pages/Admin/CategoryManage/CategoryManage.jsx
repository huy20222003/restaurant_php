import { useContext, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CategoryContext } from '../../../Contexts/CategoryContext';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { CommonContext } from '../../../Contexts/CommonContext';
import FormDialogCategory from '../../../Components/FormDialog/FormDialogCategory';
import { toast } from 'react-toastify';

const CategoryManage = () => {
  const {
    categoryState: { categories },
    handleCreateCategory,
    handleDeleteCategory,
  } = useContext(CategoryContext);

  const { setOpenFormDialog } = useContext(CommonContext);

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

  const rows = categories && categories.map((category) => {
    return {
      id: category?._id,
      name: category?.name,
      description: category?.description
    };
  });

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const fiels = [
    { name: 'name', label: 'Tên', type: 'text', row: 1 },
    {name: 'description', label: 'Mô tả', type: 'text', row: 5}
  ];

  const handleView = (categoryId) => {
    console.log(`View category with ID: ${categoryId}`);
  };

  const handleEdit = (categoryId) => {
    console.log(`Edit category with ID: ${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    try {
      const deleteData = await handleDeleteCategory(categoryId);
      if (!deleteData.success) {
        toast.error(deleteData.message);
      } else {
        toast.success(deleteData.message);
      }
    } catch (error) {
      toast.error('Server Error');
    }
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
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Danh sách danh mục
      </Typography>
      <Box sx={{ marginBottom: '2rem' }}>
        <Button variant="contained" size="medium" startIcon={<AddIcon />} onClick={handleOpenFormDialog}>
          Thêm danh mục
        </Button>
      </Box>
      <FormDialogCategory fields={fiels} handleCreate={handleCreate} />
      <Paper elevation={3} style={{ marginTop: '2rem' }}>
        <DataTable
          columns={columns}
          rows={rows}
        />
      </Paper>
    </Box>
  );
};

export default CategoryManage;
