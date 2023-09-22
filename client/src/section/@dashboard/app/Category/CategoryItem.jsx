//@mui

import { Box, Stack, Typography } from '@mui/material';

//-----------------------------------------

const CategoryItem = () => {
  return (
    <Stack
      sx={{
        gap: '12px',
        alignItems: 'center',
        p: '1rem',
        border: '1px solid #c7bbbb',
        borderRadius: '8px',
      }}
    >
      <Box
        component="img"
        src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
        sx={{ width: '100%', height: '4.5rem' }}
      ></Box>
      <Typography variant='body2'>Thời trang nam</Typography>
    </Stack>
  );
};

export default CategoryItem;
