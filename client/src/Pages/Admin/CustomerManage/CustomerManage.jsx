import { useContext, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { UsersContext } from '../../../Contexts/UsersContext';
import { CommonContext } from '../../../Contexts/CommonContext';
import FormDialogCustomer from '../../../Components/FormDialog/FormDialogCustomer';

const CustomerManage = () => {
  const {
    usersState: { users }, handleCreateUser, handleDeleteUser, handleGetOneUser
  } = useContext(UsersContext);

  const navigate = useNavigate();

  const { setOpenFormDialog } = useContext(CommonContext);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    { field: 'username', headerName: 'Tên người dùng', type: 'String', width: 90 },
    { field: 'fullName', headerName: 'Họ và tên', type: 'String', width: 160 },
    { field: 'email', headerName: 'Email', type: 'String', width: 130 },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      type: 'String',
      width: 100,
    },
    { field: 'address', headerName: 'Địa chỉ', type: 'String', width: 200 },
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
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Xoá
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows = users.map((user) => {
    return {
      id: user?._id,
      fullName: user?.fullName,
      username: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
    };
  });

  const fiels = [
    { name: 'fullName', label: 'Họ và tên', type: 'text' },
    { name: 'username', label: 'Tên người dùng', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
  ];
  
  const handleView = (userId) => {
    navigate(`/admin/customer-manage/${userId}`);
    handleGetOneUser(userId);
  };

  const handleDelete = async (userId) => {
    try {
      const deleteData = await handleDeleteUser(userId);
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

  const handleCreate = async (user) => {
    try {
      const createData = await handleCreateUser(user);
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
        Danh sách khách hàng
      </Typography>
      <Box sx={{ marginBottom: '2rem' }}>
        <Button
          variant="contained"
          size="medium"
          startIcon={<AddIcon />}
          onClick={handleOpenFormDialog}
        >
          Thêm khách hàng
        </Button>
      </Box>
      <FormDialogCustomer fields={fiels} handleCreate={handleCreate} />
      <Paper elevation={3} style={{ marginTop: '2rem' }}>
        <DataTable columns={columns} rows={rows} />
      </Paper>
    </Box>
  );
};

export default CustomerManage;
