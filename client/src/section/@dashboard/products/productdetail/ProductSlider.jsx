import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = (props) => {
  const { product } = props;

  if (!product || !product?.image_url || product?.image_url.length === 0) {
    return null;
  }

  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      {product?.image_url.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            width="645px"
            height="645px"
            style={{ borderRadius: '0.8rem', objectFit: 'cover' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Slider.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
};

export default Slider;
