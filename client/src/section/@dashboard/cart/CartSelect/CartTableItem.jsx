import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import {
  Avatar,
  Box,
  ButtonBase,
  Checkbox,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import Iconify from '../../../../Components/User/iconify';
//context
import { useCart } from '../../../../hooks/context';
//sweet alert
import Swal from 'sweetalert2';

//--------------------------------------------------------------

const StyledButtonQuantity = styled(ButtonBase)`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    overflow: visible;
    color: rgb(99, 115, 129);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    padding: 5px;
    font-size: 1.125rem;
    border-radius: 6px;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
  }
`;

const CartTableItem = ({ item, totalPrices }) => {
  const { product } = item;
  const [quantityItem, setQuantityItem] = useState(item.quantity);
  const { handleUpdateCart, handleDeleteProductFromCart } = useCart();

  const updateCartItem = useCallback(
    (newQuantity) => {
      setQuantityItem(newQuantity);
      handleUpdateCart({ productId: product?._id, quantity: newQuantity });
    },
    [handleUpdateCart, product?._id]
  );

  const handleIncrease = useCallback(() => {
    const newQuantity = quantityItem + 1;
    updateCartItem(newQuantity);
  }, [quantityItem, updateCartItem]);

  const handleDecrease = useCallback(() => {
    if (quantityItem > 1) {
      const newQuantity = quantityItem - 1;
      updateCartItem(newQuantity);
    }
  }, [quantityItem, updateCartItem]);

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: 'Delete this product?',
      text: 'Would you like to delete this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteProductFromCart(productId);
        if (response.success) {
          Swal.fire('', 'Delete Successful!', 'success');
        } else {
          Swal.fire('', 'Delete failed!', 'error');
        }
        } catch (error) {
          Swal.fire('', 'Server error!', 'error');
        }
      }
    });
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(33, 43, 54)',
            borderBottom: '1px dashed rgb(241, 243, 244)',
          }}
        >
          <Avatar
            src={product?.image_url[0]}
            sx={{
              width: '64px',
              height: '64px',
              mr: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '12px',
            }}
          ></Avatar>
          <Stack sx={{ gap: '4px' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem' }}>
              {product?.name}
            </Typography>
            <Stack
              sx={{
                alignItems: 'center',
                fontWeight: 400,
                color: 'rgb(99, 115, 129)',
                flexDirection: 'row',
              }}
            >
              size:
              <Box
                component="span"
                sx={{
                  height: '24px',
                  minWidth: '24px',
                  lineHeight: '0',
                  borderRadius: '6px',
                  cursor: 'default',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  textTransform: 'capitalize',
                  padding: '0px 6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  color: 'rgb(99, 115, 129)',
                  backgroundColor: 'rgba(145, 158, 171, 0.16)',
                  marginLeft: '4px',
                }}
              >
                6
              </Box>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>
          {product?.priceSale ? product?.priceSale : product?.price}
        </TableCell>
        <TableCell>
          <Box sx={{ width: '88px', textAlign: 'right' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '4px',
                width: '88px',
                borderRadius: '8px',
                fontWeight: 600,
                lineHeight: 1.5,
                border: '1px solid rgba(145, 158, 171, 0.2)',
              }}
            >
              <StyledButtonQuantity onClick={handleDecrease}>
                -
              </StyledButtonQuantity>
              {quantityItem}
              <StyledButtonQuantity onClick={handleIncrease}>
                +
              </StyledButtonQuantity>
            </Stack>
            <Typography
              variant="subtitle2"
              sx={{
                m: '8px 8px 0 0',
                fontWeight: 400,
                color: 'rgb(99, 115, 129)',
              }}
            >
              available
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{totalPrices}</TableCell>
        <TableCell>
          <ButtonBase
            sx={{
              color: 'rgb(99, 115, 129)',
              transition:
                'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
            onClick={() => handleDeleteProduct(product?._id)}
          >
            <Iconify icon="eva:trash-2-fill" />
          </ButtonBase>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

CartTableItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image_url: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      priceSale: PropTypes.number,
      price: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  totalPrices: PropTypes.number.isRequired,
};

export default CartTableItem;
