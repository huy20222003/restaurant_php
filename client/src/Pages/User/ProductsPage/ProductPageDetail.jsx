import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import { useProduct } from '../../../hooks/context';
import { ButtonBack } from '../../../section/@dashboard/common';
import {
  ProductSlider,
  ProductInfo,
  ProductService,
  ProductTabs,
} from '../../../section/@dashboard/products/productdetail';

const ProductPageDetail = () => {
  const {
    productsState: { product },
    handleGetOneProduct,
  } = useProduct();

  const { _id } = useParams();

  const [productInfo, setProductInfo] = useState(product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetOneProduct(_id);
        setProductInfo(response.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [_id, handleGetOneProduct]);

  return (
    <>
      <Helmet>
        <title>{product?.name || 'Product Detail'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <ButtonBack />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ProductSlider product={productInfo} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ProductInfo product={productInfo} />
          </Grid>
        </Grid>
        <ProductService />
        <ProductTabs product={productInfo} />
      </Container>
    </>
  );
};

export default ProductPageDetail;
