import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = (props) => {
  const { product } = props;

  if (!product || !product?.image_url || product?.image_url.length === 0) {
    return null;
  }

  return (
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        {product?.image_url.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              width='100%' style={{borderRadius: '0.8rem'}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default Slider;
