import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Pagination,
  Stack,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import styled from '@emotion/styled';
import DishItem from '../../../Components/User/DishItem';
import SelectFilter from '../../../Components/SelectFilter';

const BoxCustom = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '5rem',
  backgroundColor: '#f16c12',
  color: '#fff',
  borderRadius: '0.4rem',
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: '1rem',
}));

const Dishes = () => (
  <Container sx={{ my: '4rem' }}>
    <Grid container spacing={2}>
      <Grid item sm={2}>
        <BoxCustom>
          <FormatListBulletedIcon />
          <Typography sx={{ textTransform: 'uppercase' }}>Danh mục</Typography>
        </BoxCustom>
        <List>
          <CustomListItem>
            <ListItemText>Bánh kem</ListItemText>
          </CustomListItem>
          <CustomListItem>
            <ListItemText>Bánh kem</ListItemText>
          </CustomListItem>
          <CustomListItem>
            <ListItemText>Bánh kem</ListItemText>
          </CustomListItem>
          <CustomListItem>
            <ListItemText>Bánh kem</ListItemText>
          </CustomListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={10}>
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
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Grid item sm={3} xs={6}>
            <DishItem />
          </Grid>
          <Stack spacing={2}>
            <Pagination
              count={5}
              variant="outlined"
              shape="rounded"
              color='primary'
              sx={{ justifyContent: 'flex-end', margin: '2rem 0' }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default Dishes;
