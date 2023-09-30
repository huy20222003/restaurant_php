//@mui
import { Paper, Typography } from '@mui/material';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//component
import CategoryItem from './CategoryItem';
//config
import CategoryConfig from './CategoryConfig';
//---------------------------------------------------------

const Category = () => {
  const itemsPerSlide = 8;

  const categoryChunks = [];
  for (let i = 0; i < CategoryConfig.length; i += itemsPerSlide) {
    categoryChunks.push(CategoryConfig.slice(i, i + itemsPerSlide));
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: '-3rem', p: '1rem' }}>
        Category
      </Typography>
      <Paper elevation={1}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {categoryChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                  alignItems: 'center',
                  padding: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  px: '1rem'
                }}
              >
                {chunk.map((category) => (
                  <CategoryItem
                    key={category.id}
                    name={category.name}
                    image={category.image}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    </>
  );
};

export default Category;
