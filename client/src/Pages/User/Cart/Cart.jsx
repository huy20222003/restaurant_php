import {
  Container,
  Paper,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';

const Cart = () => {
  return (
    <Container sx={{ my: '2rem' }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.4rem' }}>Hình ảnh</TableCell>
              <TableCell sx={{ fontSize: '1.4rem' }}>Tên</TableCell>
              <TableCell sx={{ fontSize: '1.4rem' }}>Số lượng</TableCell>
              <TableCell sx={{ fontSize: '1.4rem' }}>Giá tiền</TableCell>
              <TableCell sx={{ fontSize: '1.4rem' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
