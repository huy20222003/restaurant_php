import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
  return (
    <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.3)', padding: '4rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" component="div" sx={{ color: '#898989', marginBottom: '1rem', fontSize: '1.4rem' }}>
            Giới thiệu
          </Typography>
          <Typography variant="p" sx={{ fontSize: '1.4rem', color: '#898989' }}>
            SUMELIA là tổ hợp chuỗi cửa hàng thực phẩm sạch số 1 tại Việt Nam
            với hơn 100 cửa hàng lớn nhỏ trên toàn quốc...
          </Typography>
          <Box>
            <List sx={{cursor: 'pointer'}}>
              <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
                <ListItemIcon>
                  <MapIcon sx={{color: '#f16c12', fontSize: '1.5rem'}} />
                </ListItemIcon>
                <ListItemText primary="Việt Nam" sx={{ color: '#898989' }} />
              </ListItem>
              <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
                <ListItemIcon>
                  <LocalPhoneIcon sx={{color: '#f16c12', fontSize: '1.5rem'}} />
                </ListItemIcon>
                <ListItemText primary="99999999999" sx={{ color: '#898989' }} />
              </ListItem>
              <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
                <ListItemIcon>
                  <MailIcon sx={{color: '#f16c12', fontSize: '1.5rem'}} />
                </ListItemIcon>
                <ListItemText
                  primary="admin@gmail.com"
                  sx={{ color: '#898989' }}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" component="div" sx={{ color: '#898989', marginBottom: '1rem', fontSize: '1.4rem' }}>
            Tài khoản
          </Typography>
          <List sx={{cursor: 'pointer'}}>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Trang chủ" sx={{ color: '#898989' }} />
            </ListItem>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Giới thiệu" sx={{ color: '#898989' }} />
            </ListItem>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Sản phẩm" sx={{ color: '#898989' }} />
            </ListItem>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Liên hệ" sx={{ color: '#898989' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" component="div" sx={{ color: '#898989', marginBottom: '1rem', fontSize: '1.4rem' }}>
            Chính sách
          </Typography>
          <List sx={{cursor: 'pointer'}}>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Trang chủ" sx={{ color: '#898989' }} />
            </ListItem>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Giới thiệu" sx={{ color: '#898989' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" component="div" sx={{ color: '#898989', marginBottom: '1rem', fontSize: '1.4rem' }}>
            Điều khoản
          </Typography>
          <List sx={{cursor: 'pointer'}}>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Trang chủ" sx={{ color: '#898989'}} />
            </ListItem>
            <ListItem sx={{p: 0, fontSize: '1.4rem'}}>
              <ListItemText primary="Liên hệ" sx={{ color: '#898989'}} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
