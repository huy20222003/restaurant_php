//@mui
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
//context
import { useProduct } from '../../../../hooks/context';
//----------------------------------------------------

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

const ProductQuantity = () => {
  const { quantity, setQuantity } = useProduct();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
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
        <StyledButtonQuantity onClick={handleDecrease}>-</StyledButtonQuantity>
        {quantity}
        <StyledButtonQuantity onClick={handleIncrease}>+</StyledButtonQuantity>
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
  );
};

export default ProductQuantity;
