import { useRef } from 'react';
//proptype
import PropTypes from 'prop-types';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
//@mui
import { Box, Stack } from '@mui/material';
//-------------------------------------------

const Slider = (props) => {
  const { product } = props;
  const swiperRef = useRef(null);

  const handleImageClick = (image, index) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <Box>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        ref={swiperRef}
      >
        {product?.image_products.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.imageUrl}
              alt={`Slide ${index}`}
              width="645px"
              height="645px"
              style={{ borderRadius: '0.8rem', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          cursor: 'pointer',
          overflowX: 'auto',
          my: '0.5rem',
        }}
      >
        {product?.image_products.map((image, index) => (
          <Stack
            key={image}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: '4px',
              width: '80px',
              height: '80px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(145, 158, 171, 0.16)',
            }}
            onClick={() => handleImageClick(image?.imageUrl, index)}
          >
            <Stack
              component={'span'}
              sx={{
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component={'img'}
                src={image?.imageUrl}
                sx={{
                  width: '100%',
                  height: '100%',
                  flexShrink: 0,
                  objectFit: 'cover',
                  position: 'absolute',
                }}
              ></Box>
            </Stack>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

Slider.propTypes = {
  product: PropTypes.shape({
    image_products: PropTypes.array.isRequired,
  }),
};

export default Slider;
