import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//@mui
import { Container, Typography, Grid, Stack, ButtonBase } from '@mui/material';
//mui
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//component
import {
  DetailCardAvatar,
  DetailCardInfo,
} from '../../../Components/Admin/detailInfo';
//context
import { useEmployee } from '../../../hooks/context';
//swall alert
import Swal from 'sweetalert2';
//----------------------------------------------------

const EmployeeDetail = () => {
  const {
    employeesState: { employee },
    handleGetOneEmployee,
    handleDeleteEmployee,
  } = useEmployee();
  const [employeeInfo, setEmployeeInfo] = useState(employee);
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetOneEmployee(_id);
        setEmployeeInfo(response.user);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [_id, handleGetOneEmployee]);

  const handleBack = () => {
    history.back();
  };

  const handleDelete = async () => {
    Swal.fire({
      title: 'Delete this employee?',
      text: 'Would you like to delete this employee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteEmployee(_id);
          if (response.success) {
            Swal.fire('', 'Delete Successful!', 'success');
            navigate('/admin/employee-manage');
          } else {
            Swal.fire('', 'Delete failed!', 'error');
          }
        } catch (error) {
          Swal.fire('', 'Server error!', 'error');
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>{'Profile'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Stack
          sx={{
            gap: '8px',
            alignItems: 'center',
            flexDirection: 'row',
            p: '80px 0 60px 0',
          }}
        >
          <ButtonBase onClick={handleBack}>
            <ArrowBackIosIcon sx={{ fontSize: '12px' }} />
          </ButtonBase>
          <Stack sx={{ gap: '4px' }}>
            <Stack
              sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}
            >
              <Typography variant="h5">Employee #{_id}</Typography>
              <Typography
                variant="overline"
                sx={{
                  height: '24px',
                  minWidth: '24px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  textTransform: 'capitalize',
                  padding: '0px 6px',
                  color: 'rgb(17, 141, 87)',
                  backgroundColor: 'rgba(34, 197, 94, 0.16)',
                }}
              >
                Verify
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <DetailCardAvatar data={employeeInfo} />
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <DetailCardInfo
              fields={[
                { name: '_id', label: 'ID', gridItemProps: 6 },
                { name: 'fullName', label: 'Full Name', gridItemProps: 6 },
                { name: 'username', label: 'Username', gridItemProps: 6 },
                { name: 'email', label: 'Email', gridItemProps: 6 },
                {
                  name: 'phoneNumber',
                  label: 'Phone Number',
                  gridItemProps: 6,
                },
                { name: 'salary', label: 'Salary', gridItemProps: 6 },
                { name: 'address', label: 'Address', gridItemProps: 12 },
              ]}
              gridItemProps={{ sm: 6, md: 6 }}
              data={employeeInfo}
              handleDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EmployeeDetail;
