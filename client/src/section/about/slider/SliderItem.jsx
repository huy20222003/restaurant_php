import PropTypes from 'prop-types';
//@mui
import styled from '@emotion/styled';
import { Box, ButtonBase, Card, Stack, Typography } from '@mui/material';
//component
import Iconify from '../../../Components/User/iconify';

//--------------------------------------------------------

const StyledPaper = styled(Card)`
  && {
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-image: none;
    overflow: hidden;
    position: relative;
    box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
      rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
    border-radius: 16px;
    z-index: 0;
    text-align: center;
  }
`;

const SliderItem = ({ item }) => {
  const { name, position, image } = item;
  return (
    <Box sx={{ width: '100%', display: 'inline-block' }}>
      <StyledPaper>
        <Typography
          variant="subtitle1"
          sx={{ margin: '20px 0px 4px', fontWeight: 600 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ m: '0 0 20px', fontWeight: 400, color: 'rgb(99, 115, 129)' }}
        >
          {position}
        </Typography>
        <Box
          component="img"
          src={image}
          sx={{
            overflow: 'hidden',
            verticalAlign: 'bottom',
            display: 'inline-block',
            width: '100%',
            borderRadius: '16px',
            px: '1rem',
            height: '320px',
            objectFit: 'cover',
          }}
        ></Box>
        <Stack
          sx={{
            flexDirection: 'row',
            mt: '24px',
            justifyContent: 'center',
            pb: '1rem',
          }}
        >
          <ButtonBase sx={{ p: '8px' }}>
            <Iconify icon="logos:facebook" />
          </ButtonBase>
          <ButtonBase sx={{ p: '8px' }}>
            <Iconify icon="skill-icons:instagram" />
          </ButtonBase>
          <ButtonBase sx={{ p: '8px' }}>
            <Iconify icon="logos:twitter" />
          </ButtonBase>
          <ButtonBase sx={{ p: '8px' }}>
            <Iconify icon="skill-icons:linkedin" />
          </ButtonBase>
        </Stack>
      </StyledPaper>
    </Box>
  );
};

SliderItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default SliderItem;
