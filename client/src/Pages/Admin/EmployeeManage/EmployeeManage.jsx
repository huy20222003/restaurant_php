import { useContext, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EmployeesContext } from '../../../Contexts/EmployeesContext';
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
import FormDialogEmployee from '../../../Components/FormDialog/FormDialogEmployee';
import { CommonContext } from '../../../Contexts/CommonContext';

const EmployeeManage = () => {
  const {
    employeesState: { employees },
    handleCreateEmployee,
    handleDeleteEmployee,
  } = useContext(EmployeesContext);

  const { setOpenFormDialog } = useContext(CommonContext);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    { field: 'fullName', headerName: 'Họ và tên', type: 'String', width: 160 },
    { field: 'email', headerName: 'Email', type: 'String', width: 130 },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      type: 'String',
      width: 90,
    },
    { field: 'address', headerName: 'Địa chỉ', type: 'String', width: 160 },
    { field: 'position', headerName: 'Vị trí', type: 'String', width: 130 },
    { field: 'salary', headerName: 'Lương', type: 'Number', width: 100 },
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

  const rows = employees.map((employee) => {
    return {
      id: employee?._id,
      fullName: employee?.fullName,
      email: employee?.email,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      position: employee?.position,
      salary: employee?.salary,
    };
  });

  const fiels = [
    { name: 'fullName', label: 'Họ và tên', type: 'text' },
    { name: 'username', label: 'Tên người dùng', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'salary', label: 'Lương', type: 'text' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
  ];

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleView = (employeeId) => {
    console.log(`View employee with ID: ${employeeId}`);
  };

  const handleEdit = (employeeId) => {
    console.log(`Edit employee with ID: ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      const deleteData = await handleDeleteEmployee(employeeId);
      if (!deleteData.success) {
        toast.error(deleteData.message);
      } else {
        toast.success(deleteData.message);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleCreate = async (employee) => {
    try {
      const createData = await handleCreateEmployee(employee);
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
        Danh sách nhân viên
      </Typography>
      <Box sx={{ marginBottom: '2rem' }}>
        <Button
          variant="contained"
          size="medium"
          startIcon={<AddIcon />}
          onClick={handleOpenFormDialog}
        >
          Thêm nhân viên
        </Button>
      </Box>
      <FormDialogEmployee fields={fiels} handleCreate={handleCreate} />
      <Paper elevation={3} style={{ marginTop: '2rem' }}>
        <DataTable columns={columns} rows={rows} />
      </Paper>
    </Box>
  );
};

export default EmployeeManage;
