//@mui
import { Grid, useMediaQuery } from '@mui/material';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
//component
import SliderItem from './SliderItem';
import sliderConfig from './sliderConfig';
//-------------------------------------------

const Slider = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <Grid container spacing={2}>
      <Swiper
        spaceBetween={50}
        slidesPerView={isSmallScreen ? 1 : 4} 
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
        {sliderConfig.map((item) => {
          return (
            <Grid item xs={12} md={3} key={item.id}>
            <SwiperSlide>
              <SliderItem item={item} />
            </SwiperSlide>
          </Grid>
          );
        })}
      </Swiper>
    </Grid>
  );
};

export default Slider;
