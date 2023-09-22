//@mui
import { Paper, Typography } from '@mui/material';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//component
import CategoryItem from './CategoryItem';
//---------------------------------------------------------

const Category = () => {
  const categories = [1, 2, 3, 4]; 

  return (
    <Paper elevation={2}>
      <Typography variant="h5" sx={{ mt: '-3rem', p: '1rem' }}>
        Category
      </Typography>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                alignItems: 'center',
                padding: '1rem',
              }}
            >
              <CategoryItem />
              <CategoryItem />
              <CategoryItem />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
};

export default Category;
