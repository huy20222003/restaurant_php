import { Container, Box, Typography, List, ListItem } from '@mui/material';

const About = () => {
  document.title = 'Giới thiệu';
  return (
    <Container>
      <Box>
        <Typography
          variant="body1"
          component="h2"
          sx={{
            color: '#ccc',
            fontSize: '2.2rem',
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: '2rem',
            marginTop: '4rem'
          }}
        >
          Giới thiệu
        </Typography>
        <Typography variant="body2" component="p" sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
          Thời gian gần đây hoa quả, thực phẩm được nhập khẩu từ Trung Quốc
          thường có dư lượng thuốc bảo quản cao có khả năng gây ra nhiều bệnh
          nan y đối với người tiêu dùng. Để đáp ứng nhu cầu ngày càng tăng về
          hoa quả sạch không có dư lượng chất bảo quản, có nguồn gốc xuất xứ rõ
          ràng từ những nước như Mỹ , Úc, Canada, Newzeland, Thái Lan, và hoa
          quả sạch với thương hiệu nổi tiếng có nguồn gốc từ Việt Nam. Sumelia
          ra đời mong muốn mang đến cho Quý khách hàng dịch vụ bán hoa quả sạch
          giao hàng tận nơi trong nội thành Hà nội với mong muốn làm hài lòng
          tât cả các Quý khách hàng .
        </Typography>
        <Typography variant="body2" component='strong' sx={{
            color: '#333',
            fontSize: '1.4rem',
            fontWeight: 300,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
          Sumelia Shop xin cam kết:
        </Typography>
        <List>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            1. Luôn đảm bảo về Chất lượng – Số lượng – Đơn giá đúng như những gì
            được mô tả cho từng sản phẩm trên website Sumelia Shop
          </ListItem>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            2. Cam kết hàng hoa quả sạch được nhập khẩu bằng đường hàng không có
            nguồn gốc xuất xứ, tem nhãn rõ ràng từ những nước như Mỹ , Úc,
            Newzeland, Thái Lan, và hoa quả sạch với thương hiệu nổi tiếng có
            nguồn gốc từ Việt Nam
          </ListItem>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            3. Cam kết hoa quả sạch luôn tươi ngon và được bảo quản sạch sẽ
            trong tủ mát có nhiệt độ phù hợp từ 5-100C và độ ẩm phù hợp.
          </ListItem>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            4. Cam kết về trọng lượng đúng như Quý khách yêu cầu bằng cân điện
            tử chính xác đến từng Gram, không gian dối về trọng lượng cũng như
            số lượng.
          </ListItem>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            5. Giao hàng tận nơi miễn phí đối với những đơn hàng từ 2kg các loại
            trở lên và với cự ly từ 10Km tính từ Ngã tư Sở (Hà Nội). Hoặc miễn
            phí với các quận 1,2,3,5, Bình Thạnh (TP.HCM). Ngoài giá trị đơn
            hàng và cự ly trên, Quý khách vui lòng thanh toán phụ phí vận chuyển
            . Thời gian giao hàng trong khoảng từ 15-20 phút hoặc theo yêu cầu
            của Quý khách.
          </ListItem>
          <ListItem sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            6. Những cam kết trên luôn có hiệu lực, Quý khách có thể trả lại
            hàng và được hoàn lại tiền nếu Sumelia Shop vi phạm 1 trong những
            cam kết trên.
          </ListItem>
        </List>
        <Typography variant="body2" component="p" sx={{
            color: '#898989',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
          Chúc Quý khách luôn hài lòng với dịch vụ và ngon miệng với sản phẩm
          cung cấp từ Sumelia Shop
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
