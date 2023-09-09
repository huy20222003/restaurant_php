import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';

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
    color: black;
  }
`;

const MainListItems = () => {
  const {
    authState: { role },
  } = useContext(AuthContext);

  return (
    <>
      <NavLinkCustom to="dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText sx={{fontSize: '0.7rem'}} primary="Trang chủ" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="customer-manage">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý khách hàng" />
        </ListItemButton>
      </NavLinkCustom>
      {role === 'admin' ? (
        <NavLinkCustom to="employee-manage">
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý nhân viên" />
          </ListItemButton>
        </NavLinkCustom>
      ) : (
        ''
      )}
      <NavLinkCustom to="product-manage">
        <ListItemButton>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý sản phẩm" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="category-manage">
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý danh mục" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="order-manage">
        <ListItemButton>
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý đơn hàng" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="chart">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Biểu đồ" />
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
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </NavLinkCustom>
    </>
  );
};

export { MainListItems, SecondaryListItems };
