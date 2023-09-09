import { useContext } from 'react';
//@mui
import { Stack, Pagination } from '@mui/material';
//context
import { ProductsContext } from '../../../Contexts/ProductsContext';

const ProductPagination = () => {
  const {
    productsState: { currentPage, totalPages },
    handlePageChange,
  } = useContext(ProductsContext);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages && totalPages}
        page={currentPage && currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default ProductPagination;
