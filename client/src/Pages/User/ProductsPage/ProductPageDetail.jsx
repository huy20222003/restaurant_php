import { Helmet } from 'react-helmet-async';
import { Button, Container, Grid, Typography } from '@mui/material';
import {
  ProductSlider,
  ProductInfo,
  ProductService,
  ProductTabs,
} from '../../../section/@dashboard/products/productdetail';
import { useEffect, useState, useContext } from 'react';
import { ProductsContext } from '../../../Contexts/ProductsContext';

const ProductPageDetail = () => {
  const {
    productsState: { product },
  } = useContext(ProductsContext);

  const [productInfo, setProductInfo] = useState(product);

  useEffect(() => {
    const getProductData = () => {
      const sessionProduct = JSON.parse(sessionStorage.getItem('product'));
      return product || sessionProduct || {};
    };

    setProductInfo(getProductData());
  }, [product]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Helmet>
        <title>{  'Product Detail'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Button onClick={handleBack} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'black' }}>
            Back
          </Typography>
        </Button>
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
