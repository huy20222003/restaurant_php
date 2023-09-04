import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

const Cards = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ display: 'flex' , margin: '4rem 0', boxShadow: '0 0 7px rgba(0,0,0,0.1)', backgroundColor: '#fff', p: '1rem', minHeight: '6rem', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
            <CardMedia>
              <LocalShippingIcon sx={{fontSize: '5rem', color: '#f16c12'}} />
            </CardMedia>
            <CardContent>
              <Typography variant='h5'>MIỄN PHÍ VẬN CHUYỂN</Typography>
              <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
                Chúng tôi vận chuyển miễn phí với đơn hàng trị giá trên
                1.000.000đ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ display: 'flex', margin: '4rem 0', boxShadow: '0 0 7px rgba(0,0,0,0.1)', backgroundColor: '#fff', p: '1rem', minHeight: '6rem', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
            <CardMedia>
              <ChatTwoToneIcon sx={{fontSize: '5rem', color: '#f16c12'}} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">HỖ TRỢ ONLINE 24/24</Typography>
              <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
                Đội tư vấn của chúng tôi luôn sẵn sàng hỗ trợ khi bạn gặp khó
                khăn
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ display: 'flex' , margin: '4rem 0', boxShadow: '0 0 7px rgba(0,0,0,0.1)', backgroundColor: '#fff', p: '1rem', minHeight: '6rem', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
            <CardMedia>
              <CardGiftcardRoundedIcon sx={{fontSize: '5rem', color: '#f16c12'}} />
            </CardMedia>
            <CardContent>
              <Typography variant='h5'>QUÀ TẶNG CUỐI TUẦN</Typography>
              <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
                Khuyến mại lớn, rinh quà tặng với mỗi thứ 7 và chủ nhật hàng
                tuần
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cards;
