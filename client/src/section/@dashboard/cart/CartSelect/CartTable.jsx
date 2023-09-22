import PropTypes from 'prop-types';
import { useEffect } from 'react';
//@mui
import {
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from '@mui/material';
//component
import CartTableItem from './CartTableItem';
//context
import { useCart } from '../../../../hooks/context';
import Iconify from '../../../../Components/User/iconify';

//---------------------------------------------------------------

const CartTable = ({
  orderData,
  setOrderData,
  selectedProducts,
  setSelectedProducts,
}) => {
  const {
    cartState: { items },
  } = useCart();
  console.log(selectedProducts);

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const productIds = prevSelectedProducts.map((p) => p._id);
      if (productIds.includes(product._id)) {
        return prevSelectedProducts.filter((p) => p._id !== product._id);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const selectedProduct of selectedProducts) {
      const { product, quantity } = selectedProduct;
      const price = product?.priceSale ? product?.priceSale : product?.price;
      totalPrice += price * quantity;
    }
    return totalPrice;
  };

  const totalPrices = calculateTotalPrice();

  useEffect(() => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      totalPrices: totalPrices,
      items: selectedProducts,
    }));
  }, [selectedProducts, setOrderData, totalPrices]);

  return (
    <>
      <Paper component={Card} sx={{ mb: '24px' }} elevation={0}>
        <CardHeader>
          <Typography variant="body1">
            Cart
            <Typography
              variant="body2"
              sx={{ m: 0, color: 'rgb(99, 115, 129)' }}
            >
              ({items.length} items)
            </Typography>
          </Typography>
        </CardHeader>
        <CardContent>
          <TableContainer
            sx={{
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ccc',
                borderRadius: '4px',
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <CartTableItem
                    key={item._id}
                    item={item}
                    onSelect={handleProductSelect}
                    isSelected={selectedProducts.some(
                      (p) => p._id === item._id
                    )}
                    orderData={orderData}
                    setOrderData={setOrderData}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Paper>
      <ButtonBase component="a" href="/dashboard/products">
        <Iconify icon="eva:arrow-ios-back-fill" />
        Continue Shopping
      </ButtonBase>
    </>
  );
};

CartTable.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
};

export default CartTable;
