import styled from "@emotion/styled";
import { Box, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

const ProductRating = ({rate})=> {
    return (
        <Box sx={{display: "flex"}}>
          <StyledRating
          name="rate"
          precision={0.1}
          value={rate !== undefined ? rate : 0}
          readOnly
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Typography variant="body1" sx={{ml: '0.5rem'}}>{rate}</Typography>
        </Box>
    );
}

export default ProductRating;