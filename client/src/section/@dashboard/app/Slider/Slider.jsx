//@mui
import { Box } from '@mui/material';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
//component
import SliderItem from './SliderItem';
//config
import SliderConfig from './SliderConfig';
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
        {SliderConfig.map((slider) => {
          return (
            <SwiperSlide key={slider}>
              <SliderItem image={slider} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Slider;
