import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropType

const CategoryItem = ({ name, image }) => {
  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Stack sx={{ alignItems: 'center', gap: '0.75rem' }}>
        <Box
          component={'img'}
          src={image}
          sx={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
          alt={name}
        ></Box>
        <Typography variant="body1">{name}</Typography>
      </Stack>
    </Box>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CategoryItem;
