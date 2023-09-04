import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Grid,
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishesContext } from '../../../Contexts/DishesContext';

const DishItem = () => {
  const {
    dishesState: { dishes }, handleGetOneDish,
  } = useContext(DishesContext);
  const navigate = useNavigate();

  const handleNavigateDishDetail = (dishId) => {
    navigate(`/dishes/${dishId}`);
    handleGetOneDish(dishId);
  };

  return (
    <>
      {dishes.map((dish) => (
        <Grid key={dish._id} item sm={3} xs={6}>
          <Card
            sx={{
              maxWidth: 300,
              margin: '1rem 1rem 1rem 0',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigateDishDetail(dish._id)}
          >
            <CardMedia
              component="img"
              alt="image"
              height="140"
              image={dish?.image_url}
            />
            <CardContent sx={{ padding: '1rem' }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: '#f16c12' }}
              >
                {dish?.price}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.4rem',
                  lineHeight: '2rem',
                  marginBottom: '1rem',
                }}
              >
                {dish.name}
              </Typography>
              <Rating value={dish.rate} precision={0.1} readOnly />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default DishItem;
