import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Contact = () => {
  document.title = 'Liên Hệ';
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '2.6rem',
          fontWeight: 600,
          color: '#333',
          margin: '3rem 0',
          padding: 0,
          lineHeight: '3rem',
        }}
      >
        Liên Hệ
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            marginBottom: '2rem',
            border: '0.1rem solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0 0 0.7rem rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            borderRadius: '0.2rem',
            height: '100%'
          }}
        >
          <Box sx={{ backgroundColor: '#f16c12', marginBottom: '2rem' }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '1.8rem',
                lineHeight: '5rem',
                paddingLeft: '1.5rem',
                color: '#fff',
              }}
            >
              Thông tin liên hệ
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.6rem',
                  lineHeight: '2.4rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PhoneAndroidIcon sx={{ marginRight: '0.5rem' }} />
                Hotline tư vấn 24/24
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: '1.4rem', color: '#898989', padding: '1rem 0' }}
              >
                9999999
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.6rem',
                  lineHeight: '2.4rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EmailIcon sx={{ marginRight: '0.5rem' }} />
                Email
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: '1.4rem', color: '#898989', padding: '1rem 0' }}
              >
                admin@gmail.com
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: '1.6rem',
                lineHeight: '2.4rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              <FmdGoodIcon />
              Địa chỉ
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.4rem', color: '#898989', padding: '1rem 0' }}
            >
              Hà Nội, Việt Nam
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            margin: '0 0 2rem 0',
            border: '0.1rem solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0 0 0.7rem rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            marginLeft: '3rem',
            borderRadius: '0.2rem',
          }}
        >
          <Box sx={{ backgroundColor: '#f16c12', marginBottom: '2rem' }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '1.8rem',
                lineHeight: '5rem',
                paddingLeft: '1.5rem',
                color: '#fff',
              }}
            >
              Gửi yêu cầu
            </Typography>
          </Box>
          <Box component="form" noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Họ và tên"
              name="fullName"
              autoComplete="fullName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Nội dung"
              name="description"
              autoComplete="description"
              multiline
              rows={5}
              autoFocus
            />
            <Button
              sx={{
                borderRadius: '0.4rem',
                backgroundColor: '#f16c12',
                padding: '1.2rem 2rem',
                marginTop: '1rem',
                color: '#fff',
                float: 'right',
                fontSize: '1.2rem'
              }}
            >
              Gửi yêu cầu
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
