import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import {
  OverviewBudget,
  OverviewLatestOrders,
  OverviewLatestProducts,
  OverviewSales,
  OverviewTasksProgress,
  OverviewTotalCustomers,
  OverviewTotalProfit,
  OverviewTraffic,
  AppWebsiteVisits,
} from '../../../section/admin/dashboard';
//context hook
import { useProduct } from '../../../hooks/context';
//------------------------------------------------------------------

const AdminDashboard = () => {
  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  useEffect(()=> {
    handleGetAllProducts();
  }, [handleGetAllProducts]);
  return (
    <>
      <Helmet>
        <title>Overview | Devias Kit</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value="$24k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: '100%' }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: '100%' }} value="$15k" />
            </Grid>
            <Grid xs={12} lg={12}>
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Desktop', 'Tablet', 'Phone']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Website Visits"
                subheader="(+43%) than last year"
                chartLabels={[
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ]}
                chartData={[
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestProducts
                products={products}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova',
                    },
                    createdAt: 1555016400000,
                    status: 'pending',
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu',
                    },
                    createdAt: 1555016400000,
                    status: 'delivered',
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson',
                    },
                    createdAt: 1554930000000,
                    status: 'refunded',
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer',
                    },
                    createdAt: 1554757200000,
                    status: 'pending',
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert',
                    },
                    createdAt: 1554670800000,
                    status: 'delivered',
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov',
                    },
                    createdAt: 1554670800000,
                    status: 'delivered',
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AdminDashboard;
