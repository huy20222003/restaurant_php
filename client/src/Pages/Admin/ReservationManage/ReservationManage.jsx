import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  Typography,
  Popover,
  MenuItem,
  Menu,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//icon
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//context
import { useReservation, useCommon } from '../../../hooks/context';
//component
import Iconify from '../../../Components/User/iconify';
import FormDialogTable from '../../../Components/FormDialog/FormDialogTable';
//sweetalert
import Swal from 'sweetalert2';
//util
import { fDateTime } from '../../../utils/formatTime';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//---------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const ReservationManage = () => {
  const {
    reservationState: { reservations },
    handleGetAllReservations,
    handleCreateTable
  } = useReservation();
  const { setOpenFormDialog } = useCommon();

  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  useEffect(() => {
    handleGetAllReservations();
  }, [handleGetAllReservations]);

  const formik = useFormik({
    initialValues: {
      tableName: '',
      description: '',
    },
    validationSchema: yup.object({
      tableName: yup
        .string()
        .required('Table Name is required')
        .max(100, 'The maximum number of characters is 100'),
      description: yup
        .string()
        .required('Description is required')
        .max(1000, 'The maximum number of characters is 1000'),
    }),
    onSubmit: async(values) => {
        try {
            if (isEdit) {
              const editData = await handleCreateTable(values._id, values);
              if (!editData.success) {
                Swal.fire({
                  title: 'Update category failed!',
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                });
              } else {
                Swal.fire({
                  title: 'Update category successful!',
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                });
              }
            } else {
              const createData = await handleCreateTable(values);
              if (!createData.success) {
                Swal.fire({
                  title: 'Add table failed!',
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                });
              } else {
                Swal.fire({
                  title: 'Add table Successful!',
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                });
              }
            }
            formik.setValues({});
            setOpenFormDialog(false);
          } catch (error) {
            Swal.fire({
              title: 'Server Error',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        },
  });

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 160 },
    {
      field: 'tableName',
      headerName: 'Table Name',
      type: 'String',
      width: 160,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'String',
      width: 200,
    },
    {
      field: 'reservationDateFrom',
      headerName: 'From',
      type: 'Date',
      width: 160,
    },
    {
      field: 'reservationDateTo',
      headerName: 'To',
      type: 'Number',
      width: 100,
    },
    { field: 'note', headerName: 'Note', type: 'String', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Create Date',
      type: 'String',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Update Date',
      type: 'String',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
              View
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Delete
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows = reservations.map((reservation) => {
    return {
      id: reservation?._id,
      fullName: reservation?.fullName,
      tableName: reservation?.tableName,
      description: reservation?.description,
      reservationDateFrom: reservation?.reservationDateFrom,
      reservationDateTo: reservation?.reservationDateTo,
      note: reservation?.note,
      createdAt: fDateTime(reservation?.createdAt),
      updatedAt: fDateTime(reservation?.updatedAt),
    };
  });

  const fields = [
    { name: 'tableName', label: 'Table Name', type: 'text', row: 1 },
    { name: 'description', label: 'Description', type: 'text', row: 5 },
  ];

  const handleView = (reservationId) => {
    console.log(`View reservation with ID: ${reservationId}`);
  };

  const handleEdit = (reservationId) => {
    navigate(`/admin/reservation-manage/edit/${reservationId}`);
  };

  const handleDelete = async (reservationId) => {
    // Swal.fire({
    //   title: 'Delete this product?',
    //   text: 'Would you like to delete this product?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, of course!',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await handleDeleteProduct(productId);
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
    console.log(reservationId);
  };

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', flex: '1 1 auto', maxWidth: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1, py: '2.5rem' }}>
            <Container maxWidth="xl">
              <Stack>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mb: '1rem',
                  }}
                >
                  <Stack>
                    <Typography variant="h5" color="primary">
                      Reservations
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: '0.5rem',
                      }}
                    >
                      <ButtonBase sx={{ p: '0.2rem' }}>
                        <Iconify
                          icon="material-symbols:upload"
                          sx={{ mr: '0.3rem' }}
                        />
                        Upload
                      </ButtonBase>
                      <ButtonBase sx={{ p: '0.2rem' }}>
                        <Iconify icon="uil:import" sx={{ mr: '0.3rem' }} />
                        Export
                      </ButtonBase>
                    </Stack>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ borderRadius: '0.375rem' }}
                      onClick={handleOpenFormDialog}
                    >
                      Add Table
                    </Button>
                  </Stack>
                </Stack>
                <DataTable columns={columns} rows={rows} />
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
      <FormDialogTable
        fields={fields}
        formik={formik}
        handleSave={formik.handleSubmit}
        isEdit={isEdit}
      />
    </StyledPaper>
  );
};

export default ReservationManage;
