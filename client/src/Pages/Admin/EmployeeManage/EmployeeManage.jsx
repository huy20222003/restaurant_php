import { useEffect, useState } from 'react';
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
import FormDialogEmployee from '../../../Components/FormDialog/FormDialogEmployee';
import Iconify from '../../../Components/User/iconify';
//context
import { useCommon, useEmployee } from '../../../hooks/context';
//toast
import { toast } from 'react-toastify';
//sweetalert
import Swal from 'sweetalert2';

//----------------------------------------------------------------------

const EmployeeManage = () => {
  const {
    employeesState: { employees },
    handleGetOneEmployee,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
  } = useEmployee();

  const { setOpenFormDialog } = useCommon();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isEdit) {
      setOpenFormDialog(true);
    }
  }, [isEdit, setOpenFormDialog]);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    {
      field: 'avatar',
      headerName: '',
      type: 'String',
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: '70%', height: '70%', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'username', headerName: 'Username', type: 'String', width: 100 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 160 },
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
      avatar: employee?.avatar,
      username: employee?.username,
      fullName: employee?.fullName,
      email: employee?.email,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      position: employee?.position,
      salary: employee?.salary,
    };
  });

  const fields = [
    { name: 'fullName', label: 'FullName', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'salary', label: 'Salary', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleView = (employeeId) => {
    console.log(`View employee with ID: ${employeeId}`);
  };

  const handleEdit = async (employeeId) => {
    const response = await handleGetOneEmployee(employeeId);
    if (response.success) {
      setFormData(response.employee);
    }
    setIsEdit(true);
  };

  const handleDelete = async (employeeId) => {
    Swal.fire({
      title: 'Delete this employee?',
      text: 'Would you like to delete this employee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteEmployee(employeeId);
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

  const handleSave = async () => {
    try {
      if (isEdit) {
        const editData = await handleUpdateEmployee(formData?._id, formData);
        if (!editData.success) {
          toast.error('Employee update failed');
        } else {
          toast.success('Employee update successful');
        }
      } else {
        const createData = await handleCreateEmployee(formData);
        if (!createData.success) {
          toast.error('Add Employee failed');
        } else {
          toast.success('Add Employee successful');
        }
      }
      setFormData({});
      setOpenFormDialog(false);
    } catch (error) {
      toast.error('Lỗi máy chủ');
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
          <Container sx={{ pt: '40px' }}>
            <Stack>
              <Stack
                sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Stack>
                  <Typography variant="h4">Employees</Typography>
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
              <FormDialogEmployee
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

export default EmployeeManage;
