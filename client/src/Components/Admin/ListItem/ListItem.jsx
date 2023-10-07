import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import styled from '@emotion/styled';
//-------------------------------------------------------------

const NavLinkCustom = styled(NavLink)`
  && {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: block;
    text-decoration: none;
    color: #fff;
  }
`;

const MainListItems = () => {
  return (
    <>
      <NavLinkCustom to="/admin">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: '0.7rem' }} primary="Trang chủ" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="customer-manage">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý khách hàng" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="employee-manage">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý nhân viên" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="product-manage">
        <ListItemButton>
          <ListItemIcon>
            <FastfoodIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý sản phẩm" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="category-manage">
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý danh mục" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="order-manage">
        <ListItemButton>
          <ListItemIcon>
            <AddShoppingCartIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Quản lý đơn hàng" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="payment-manage">
        <ListItemButton>
          <ListItemIcon>
            <PaymentIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Thanh toan" />
        </ListItemButton>
      </NavLinkCustom>
    </>
  );
};

const SecondaryListItems = () => {
  return (
    <>
      <NavLinkCustom to="/auth/admin/login">
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </NavLinkCustom>
    </>
  );
};

export { MainListItems, SecondaryListItems };
