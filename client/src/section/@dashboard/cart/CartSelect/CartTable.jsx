import { useState } from 'react';
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
  Typography,
} from '@mui/material';
//component
import CartTableItem from './CartTableItem';
//context
import { useCart } from '../../../../hooks/context';
import Iconify from '../../../../Components/User/iconify';

//---------------------------------------------------------------

const CartTable = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const {
    cartState: { items, totalPrices },
  } = useCart();

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

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
              {items.map((item) => (
                <CartTableItem
                  key={item._id}
                  item={item}
                  totalPrices={totalPrices}
                  onSelect={handleProductSelect}
                  isSelected={selectedProducts.includes(item)}
                />
              ))}
            </Table>
          </TableContainer>
        </CardContent>
      </Paper>
      <ButtonBase component='a' href='/dashboard/products'>
        <Iconify icon="eva:arrow-ios-back-fill" />
        Continue Shopping
      </ButtonBase>
    </>
  );
};

export default CartTable;
