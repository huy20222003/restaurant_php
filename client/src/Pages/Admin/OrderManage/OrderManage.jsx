//@mui
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Popover,
} from '@mui/material';
//icon
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import DataTable from '../../../Components/Admin/DataTable';
import Iconify from '../../../Components/User/iconify';
//context
import {useOrder} from '../../../hooks/context';
//toast
import { toast } from 'react-toastify';
//sweetalert
import Swal from 'sweetalert2';
import { useState } from 'react';

//----------------------------------------------------------------------

const OrderManage = () => {
  const {ordersState: {orders}} = useOrder();
  

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 140 },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      type: 'String',
      width: 120,
    },
    { field: 'shipAddress', headerName: 'Địa chỉ nhận hàng', type: 'String', width: 200 },
    { field: 'totalPrices', headerName: 'Tổng giá trị', type: 'Number', width: 130 },
    { field: 'status', headerName: 'Trạng thái', type: 'String', width: 100 },
    { field: 'shippingFee', headerName: 'Phí Ship', type: 'Number', width: 100 },
    { field: 'shippingUnit', headerName: 'Đơn vị vận chuyển', type: 'String', width: 200 },
    { field: 'paymentMethod', headerName: 'Phương thức thanh toán', type: 'String', width: 200 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 90,
      renderCell: ActionsCell,
    },
  ];

  const rows = orders.map((order) => {
    return {
      id: order?._id,
      fullName: order?.fullName,
      phoneNumber: order?.phoneNumber,
      shipAddress: order?.shipAddress,
      totalPrices: order?.totalPrices,
      status: order?.status,
      shippingFee: order?.shippingFee,
      shippingUnit: order?.shippingUnit,
      paymentMethod: order?.paymentMethod,
    };
  });

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

  const fiels = [
    { name: 'fullName', label: 'Họ và tên', type: 'text' },
    { name: 'username', label: 'Tên người dùng', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'salary', label: 'Lương', type: 'text' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
  ];

//   const handleOpenFormDialog = () => {
//     setOpenFormDialog(true);
//   };

  const handleView = (employeeId) => {
    console.log(`View employee with ID: ${employeeId}`);
  };

  const handleEdit = (employeeId) => {
    console.log(`Edit employee with ID: ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    // Swal.fire({
    //   title: 'Delete this employee?',
    //   text: 'Would you like to delete this employee?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, of course!',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await handleDeleteEmployee(employeeId);
    //       if (response.success) {
    //         Swal.fire('', 'Delete Successful!', 'success');
    //       } else {
    //         Swal.fire('', 'Delete failed!', 'error');
    //       }
    //     } catch (error) {
    //       Swal.fire('', 'Server error!', 'error');
    //     }
    //   }
    // });
  };

//   const handleCreate = async (employee) => {
//     try {
//       const createData = await handleCreateEmployee(employee);
//       if (!createData.success) {
//         toast.error(createData.message);
//       } else {
//         toast.success(createData.message);
//       }
//     } catch (error) {
//       toast.error('Server Error');
//     }
//   };

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
                  <Typography variant="h4">Orders</Typography>
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

export default OrderManage;
