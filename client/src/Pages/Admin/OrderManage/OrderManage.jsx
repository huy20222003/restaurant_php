import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  ButtonBase,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Popover,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//icon
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import DataTable from '../../../Components/Admin/DataTable';
import Iconify from '../../../Components/User/iconify';
//context
import { useOrder } from '../../../hooks/context';
import { useEffect, useState } from 'react';
//util
import { fDateTime } from '../../../utils/formatTime';

//----------------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const OrderManage = () => {
  const {
    ordersState: { orders },
    handleGetAllOrders,
  } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllOrders();
  }, [handleGetAllOrders]);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 140 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'String',
      width: 120,
    },
    {
      field: 'shipAddress',
      headerName: 'Ship Address',
      type: 'String',
      width: 200,
    },
    {
      field: 'totalPrices',
      headerName: 'Total Prices',
      type: 'Number',
      width: 130,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'String',
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === 'delivered' || params.value === 'return'
                ? 'success.light'
                : params.value === 'cancelled'
                ? 'error.light'
                : 'info.light',
            p: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          <Typography sx={{ color: '#fff' }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'shippingFee',
      headerName: 'Shipping Fee',
      type: 'Number',
      width: 100,
    },
    {
      field: 'shippingUnit',
      headerName: 'Shipping Unit',
      type: 'String',
      width: 200,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      type: 'String',
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
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

  const rows = orders.map((order) => {
    return {
      id: order?._id,
      fullName: order?.fullName,
      phoneNumber: order?.phoneNumber,
      shipAddress: order?.shipAddress,
      totalPrices: order?.totalPrices,
      status: order?.status[order?.status.length - 1],
      shippingFee: order?.shippingFee,
      shippingUnit: order?.shippingUnit,
      paymentMethod: order?.paymentMethod,
      createdAt: fDateTime(order?.createdAt),
      updatedAt: fDateTime(order?.updatedAt),
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
          </Menu>
        </Popover>
      </div>
    );
  }

  const handleView = (orderId) => {
    navigate(`/admin/order-manage/${orderId}`);
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
          <Box sx={{ flexGrow: 1, py: '40px' }}>
            <Container>
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
                      Orders
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: '8px',
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
                </Stack>

                <DataTable columns={columns} rows={rows} />
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default OrderManage;
