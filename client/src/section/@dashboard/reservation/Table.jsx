//@mui
import { Box, Paper, Stack, Typography } from '@mui/material';
//component
import FormDialogReservation from '../../../Components/FormDialog/FormDialogReservation';
//context
import { useCommon, useAuth, useReservation } from '../../../hooks/context';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//tableConfig
import tableConfig from '../../../config/tableConfig';
//sweetalert
import Swal from 'sweetalert2';
//------------------------------------------------

const Table = () => {
  const { setOpenFormDialog } = useCommon();
  const {
    authState: { user },
  } = useAuth();

  const {handleCreateReservation, reservationState: {reservation}} = useReservation();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      tableName: '',
      reservationDate: '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required('FullName is required')
        .max(200, 'The maximum number of characters is 200'),
      tableName: yup
        .string()
        .required('Table Name is required')
        .max(100, 'The maximum number of characters is 100'),
      reservationDate: yup
        .date()
        .required('Reservation Date is required')
        .min(new Date(), 'Reservation Date must be in the future'),
    }),
    onSubmit: async(values)=> {
      try {
        const createData = await handleCreateReservation(values);
        if (createData.success) {
          Swal.fire('', 'Reservation success', 'success');
        } else {
          Swal.fire('', 'Reservation failed', 'error');
        }
        formik.setFieldValue({});
        setOpenFormDialog(false);
      } catch (error) {
        Swal.fire('', 'Server Error', 'error');
      }
    },
  });

  const handleOpenFormDialog = (table) => {
    setOpenFormDialog(true);
    formik.setFieldValue('tableName', table.name);
    formik.setFieldValue('fullName', user?.fullName);
  };

  // const fields = [{ name: 'fullName', label: 'FullName', type: 'text' }];

  return (
    <Paper sx={{ my: '1rem', p: '1rem' }} elevation={1}>
      <Typography variant="h6" sx={{ mb: '1rem' }}>
        Table
      </Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          px: '1rem',
        }}
      >
        {tableConfig.map((table) => (
          <Stack
            key={table.name}
            sx={{
              alignItems: 'center',
              gap: '0.75rem',
              m: '1rem',
              cursor: reservation ? 'default' : 'pointer',
            }}
            onClick={
              reservation ? null : () => handleOpenFormDialog(table)
            }
          >
            <Box
              component={'img'}
              src={
                reservation
                  ? '/assets/images/reservation/table-not-empty.png'
                  : '/assets/images/reservation/table-empty.png'
              }
              sx={{
                width: '3rem',
                height: '3rem',
                mr: '1rem',
              }}
            ></Box>
            <Typography variant="subtitle1">{table.name}</Typography>
          </Stack>
        ))}
      </Stack>
      <FormDialogReservation formik={formik} handleSave={formik.handleSubmit} />
    </Paper>
  );
};

export default Table;
