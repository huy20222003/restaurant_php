import styled from "@emotion/styled";
import { Rating } from "@mui/material";
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
        <StyledRating
          name="rate"
          precision={0.1}
          value={rate !== undefined ? rate : 0}
          readOnly
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
    );
}

export default ProductRating;