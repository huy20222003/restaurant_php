import PropTypes from 'prop-types'; 
//@mui
import { Box } from '@mui/material';
//-------------------------------------------

const SliderItem = ({ image }) => {
  return (
    <Box
      component={'img'}
      src={image}
      sx={{
        maxHeight: '13rem',
        width: '100%',
        borderRadius: '1rem',
        objectFit: 'cover',
      }}
    ></Box>
  );
};

SliderItem.propTypes = {
  image: PropTypes.string.isRequired, 
};

export default SliderItem;
