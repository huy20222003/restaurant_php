import { useContext, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DishesContext } from '../../../Contexts/DishesContext';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { toast } from 'react-toastify';
import { CommonContext } from '../../../Contexts/CommonContext';
import FormDialogDishes from '../../../Components/FormDialog/FormDialogDishes';

const DishManage = () => {
  const {
    dishesState: { dishes },
    handleCreateDish,
    handleDeleteDish,
  } = useContext(DishesContext);

  const { setOpenFormDialog } = useContext(CommonContext);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    { field: 'image_url', headerName: 'Ảnh', type: 'String', width: 100 },
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

  const rows = dishes.map((dish) => {
    return {
      id: dish?._id,
      image_url: dish?.image_url,
      name: dish?.name,
      description: dish?.description,
      category: dish?.category,
      price: dish?.price,
      rate: dish?.rate,
    };
  });

  const fiels = [
    { name: 'name', label: 'Tên', type: 'text', mutiline: false, rows: 1 },
    { name: 'description', label: 'Mô tả', type: 'text', mutiline: true, rows: 5 },
    { name: 'price', label: 'Giá', type: 'text', mutiline: false, rows: 1 },
    { name: 'image_url', label: 'Ảnh sản phẩm', type: 'text', mutiline: false, rows: 1 },
  ];

  const handleView = (dishId) => {
    console.log(`View dish with ID: ${dishId}`);
  };

  const handleEdit = (dishId) => {
    console.log(`Edit dish with ID: ${dishId}`);
  };

  const handleDelete = async (dishId) => {
    try {
      const deleteData = await handleDeleteDish(dishId);
      if (!deleteData.success) {
        toast.error(deleteData.message);
      } else {
        toast.success(deleteData.message);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCreate = async (dish) => {
    try {
      const createData = await handleCreateDish(dish);
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
      <Typography variant="h3" align="center" gutterBottom>
        Danh sách món ăn
      </Typography>
      <Box sx={{ marginBottom: '2rem' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleOpenFormDialog}
        >
          Thêm món ăn
        </Button>
      </Box>
      <FormDialogDishes fields={fiels} handleCreate={handleCreate} />
      <Paper elevation={3} style={{ marginTop: '2rem' }}>
        <DataTable columns={columns} rows={rows} />
      </Paper>
    </Box>
  );
};

export default DishManage;
