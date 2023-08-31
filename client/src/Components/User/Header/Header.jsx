import { Badge, Container, Box, Typography, Divider } from '@mui/material';
import styles from './Header.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Search from '../Search';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';

const CustomTabContainer = styled('div')(({ theme }) => ({
  padding: '0.4rem 1rem',
  cursor: 'pointer',
}));

const CustomTabTitle = styled('p')(({ theme }) => ({
  fontSize: '1.4rem',
  '&:hover': {
    color: '#f16c12',
  },
  textTransform: 'uppercase',
  fontFamily: 'Roboto, san-serif',
}));

const Header = () => {
  const {
    authState: { user, isAuthenticated },
  } = useContext(AuthContext);

  console.log(isAuthenticated);

  return (
    <div>
      <Container>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <img
              src="https://bizweb.dktcdn.net/100/068/166/themes/880372/assets/logo.png?1676015225050"
              alt="Logo"
            />
          </div>
          <Search />
          <div className={styles.btnContainer}>
            {isAuthenticated ? (
              <Typography>{user?.username}</Typography>
            ) : (
              <div className={styles.btnAuthencation}>
                <Link
                  to="/auth/register"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <p>Đăng ký</p>
                </Link>
                <span>/</span>
                <Link
                  to="/auth/login"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <p>Đăng nhập</p>
                </Link>
              </div>
            )}
            <div className={styles.btnCart}>
              <Badge badgeContent={1} color="primary" sx={{ fontSize: '1rem' }}>
                <ShoppingCartIcon color="#fff" sx={{ fontSize: 20 }} />
              </Badge>
              <Typography>Giỏ hàng</Typography>
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Divider />
          <CustomTabContainer>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <CustomTabTitle>Trang chủ</CustomTabTitle>
            </Link>
          </CustomTabContainer>
          <CustomTabContainer>
            <Link
              to="/dishes"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <CustomTabTitle>Món ăn</CustomTabTitle>
            </Link>
          </CustomTabContainer>
          <CustomTabContainer>
            <Link
              to="/service"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <CustomTabTitle>Dịch vụ</CustomTabTitle>
            </Link>
          </CustomTabContainer>
          <CustomTabContainer>
            <Link to="/sale" style={{ textDecoration: 'none', color: 'black' }}>
              <CustomTabTitle>Khuyến mại</CustomTabTitle>
            </Link>
          </CustomTabContainer>
          <CustomTabContainer>
            <Link
              to="/contact"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <CustomTabTitle>Liên hệ</CustomTabTitle>
            </Link>
          </CustomTabContainer>
        </Box>
      </Container>
      <Divider />
    </div>
  );
};

export default Header;
