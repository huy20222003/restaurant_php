import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from '@mui/material';
import anhLogin from '../../../assets/images/anhLogin.jpg';

const DishItem = () => {
  return (
    <Card sx={{ maxWidth: 250, margin: '1rem 1rem 1rem 0' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={anhLogin}
      />
      <CardContent sx={{padding: '1rem'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{color: '#f16c12'}}>
          100.000
        </Typography>
        <Typography variant='p' component='p' sx={{fontSize: '1.4rem', lineHeight: '2rem', marginBottom: '1rem'}}>Bánh kem</Typography>
        <Rating value={5} readOnly></Rating>
      </CardContent>
    </Card>
  );
};

export default DishItem;
