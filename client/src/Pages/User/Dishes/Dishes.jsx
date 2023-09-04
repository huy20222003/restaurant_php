import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  Stack,
} from '@mui/material';
import React, { useContext, Suspense } from 'react';
const DishItem = React.lazy(()=> import('./DishItem'));
import SelectFilter from '../../../Components/SelectFilter';
import { DishesContext } from '../../../Contexts/DishesContext';
import Sidebar from '../../../Components/User/Sidebar';
import Loader from '../../../Components/Loader';


const Dishes = () => {
  document.title = 'Món ăn';
  const {
    dishesState: { totalPages },
    handlePageChange,
    currentPage,
  } = useContext(DishesContext);

  return (
    <Container sx={{ my: '4rem' }}>
      <Grid container spacing={2}>
        <Sidebar />
        <Grid item xs={12} sm={10} >
          <Box
            sx={{
              backgroundColor: '#f16c12',
              height: '5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '0.4rem',
              fontSize: '1.4rem',
              padding: '0 2rem',
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '1.4rem' }}>
              Món ăn
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: '#fff', fontSize: '1.4rem' }}>
                Sắp xếp
              </Typography>
              <SelectFilter />
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Suspense fallback={<Loader />}>
              <DishItem />
            </Suspense>
          </Grid>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dishes;
