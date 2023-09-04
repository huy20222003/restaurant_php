import {
  Badge,
  Container,
  Box,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import styles from './Header.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Search from '../Search';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';

const CustomTabContainer = styled('div')`
  && {
    padding: 0.4rem 1rem;
    cursor: pointer;
  }
`;

const CustomTabTitle = styled('p')`
  && {
    font-size: 1.4rem;
    text-transform: uppercase;
    font-family: Roboto, sans-serif;
    &:hover {
      color: #f16c12; // Màu khi hover
    }
  }
`;

const Header = () => {
  const {
    authState: { user, isAuthenticated },
    logoutUser,
  } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleClose();
  };

  const hadleNavigateCart = () => {
    navigate('/user/cart');
  };

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
              <Box sx={{ mx: '1rem' }}>
                <Avatar
                  alt="avatar"
                  src={user?.avatar}
                  onClick={handleClick}
                  sx={{ cursor: 'pointer' }}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                    onClick={handleClose}
                  >
                    <Link
                      to="/"
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      Trang chủ
                    </Link>
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                    onClick={handleClose}
                  >
                    <Link
                      to="/user/profile"
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      Thông tin cá nhân
                    </Link>
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                    onClick={handleClose}
                  >
                    <Link
                      to="/user/account"
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      Tài khoản của tôi
                    </Link>
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                    onClick={handleLogout}
                  >
                    <Link
                      to="/"
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      Đăng xuất
                    </Link>
                  </MenuItem>
                </Menu>
                {/* <Typography sx={{fontSize: '1.4rem', marginLeft: '1rem'}}>
                  {user?.username}
                </Typography> */}
              </Box>
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
            {isAuthenticated ? (
              <div className={styles.btnCart} onClick={hadleNavigateCart}>
                <Badge
                  badgeContent={1}
                  color="primary"
                  sx={{ fontSize: '1rem' }}
                >
                  <ShoppingCartIcon color="#fff" sx={{ fontSize: 20 }} />
                </Badge>
                <Typography>Giỏ hàng</Typography>
              </div>
            ) : (
              ''
            )}
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
              to="/about"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <CustomTabTitle>Giới thiệu</CustomTabTitle>
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
