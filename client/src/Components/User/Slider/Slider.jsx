import { Box, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { useContext } from 'react';
import { DishesContext } from '../../../Contexts/DishesContext';
import { Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const Slider = () => {
  const {
    dishesState: { dishes },
  } = useContext(DishesContext);

  return (
    <Container>
      <Box sx={{my: '4rem'}}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[EffectFade, Thumbs]}
          effect="fade"
          watchSlidesProgress
        >
          {dishes.map((dish, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={dish?.image_url} alt="banner" style={{borderRadius: '0.4rem', width: '100%', height: '30rem', objectFit: 'cover'}} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
};

export default Slider;
