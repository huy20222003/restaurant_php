//@mui
import { Box } from '@mui/material';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

//--------------------------------------------------

const Slider = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '270px' }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <Box
            component={'img'}
            src="/assets/images/background/hero.jpg"
            sx={{
              maxHeight: '13rem',
              width: '100%',
              borderRadius: '1rem',
              objectFit: 'cover',
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component={'img'}
            src="/assets/images/background/hero.jpg"
            sx={{
              maxHeight: '13rem',
              width: '100%',
              borderRadius: '1rem',
              objectFit: 'cover',
            }}
          ></Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Slider;
