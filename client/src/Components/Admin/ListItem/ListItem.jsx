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
import styled from '@emotion/styled';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';

const NavLinkCustom = styled(NavLink)`
  && {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
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
      <NavLinkCustom to="/admin">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="/admin/customer-manage">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý khách hàng" />
        </ListItemButton>
      </NavLinkCustom>
      {role === 'admin' ? (
        <NavLinkCustom to="/admin/employee-manage">
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
      <NavLinkCustom to="/admin/dish-manage">
        <ListItemButton>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý món ăn" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="/admin/category-manage">
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý danh mục" />
        </ListItemButton>
      </NavLinkCustom>
      <NavLinkCustom to="/admin/chart">
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
