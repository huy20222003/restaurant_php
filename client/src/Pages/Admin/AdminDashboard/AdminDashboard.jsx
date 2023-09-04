import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

 import Chart from '../../../Components/Admin/Chart';
// import Deposits from './Deposits';
import Orders from '../../../Components/Admin/Orders';

const AdminDashboard = () => {
  document.title = 'Admin Dashboard';

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Orders />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          {/* <Orders /> */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
