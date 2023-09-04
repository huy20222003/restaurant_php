import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DishesContext } from '../../../Contexts/DishesContext';
import Sidebar from '../../../Components/User/Sidebar';

const defaultTheme = createTheme();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DishDetail = () => {
  let {
    dishesState: { dish },
  } = useContext(DishesContext);

  if(!dish) {
    dish = JSON.parse(sessionStorage.getItem('dish'));
  }

  document.title = dish?.name;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ my: '4rem' }}>
        <Grid container spacing={2}>
          <Sidebar />
          <Grid item xs={12} sm={10}>
            <Paper
             elevation={3}
             sx={{paddingLeft: '1rem', paddingBottom: '1rem'}}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <img
                      src={dish?.image_url}
                      alt="image"
                      width="400"
                      height="400"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body1"
                      component="h1"
                      sx={{
                        fontSize: '2.1rem',
                        lineHeight: '2.4rem',
                        fontWeight: 600,
                        p: '2rem 0 1rem 0',
                      }}
                    >
                      {dish?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#898989',
                        fontSize: '1.4rem',
                        lineHeight: '3rem',
                        display: 'inline',
                      }}
                    >
                      Tình trạng:{' '}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#f16c12',
                          fontSize: '1.4rem',
                          lineHeight: '3rem',
                          display: 'inline',
                        }}
                      >
                        Còn hàng
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#898989',
                        fontSize: '1.4rem',
                        lineHeight: '3rem',
                      }}
                    >
                      Mã sản phẩm:{' '}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#f16c12',
                          fontSize: '1.4rem',
                          lineHeight: '3rem',
                          display: 'inline',
                        }}
                      >
                        {dish?._id}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#f16c12',
                        fontSize: '2.2rem',
                        lineHeight: '3rem',
                      }}
                    >
                      {`${dish?.price} VND`}
                    </Typography>
                    <Box sx={{ my: '4rem' }}>
                      <Button
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        sx={{
                          border: '0.1rem solid #f16c12',
                          borderRadius: '0.4rem',
                          color: '#f16c12',
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        size="large"
                        sx={{
                          marginLeft: '2rem',
                          borderRadius: '0.4rem',
                          backgroundColor: '#f16c12',
                          color: '#fff',
                          padding: '1.2rem 2rem',
                        }}
                      >
                        Mua ngay
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ width: '100%', my: '4rem' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Mô tả" {...a11yProps(0)} />
                  <Tab label="Tab tuỳ chỉnh" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <Paper
               elevation={3}
              >
                <CustomTabPanel value={value} index={0}>
                  <Typography variant="body2" component="p">
                    {dish?.description}
                  </Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Typography variant="body2" component="p">
                    Tab tuỳ chỉnh
                  </Typography>
                </CustomTabPanel>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default DishDetail;
