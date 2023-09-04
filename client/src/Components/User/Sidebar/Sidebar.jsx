import styled from '@emotion/styled';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';

const BoxCustom = styled('div')`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    background-color: #f16c12;
    color: #fff;
    border-radius: 0.4rem;
  }
`;

const CustomListItem = styled(ListItem)`
  && {
    margin-bottom: 1rem;
    cusor: pointer;
    &:hover {
      color: #f16c12;
    }
  }
`;

const Sidebar = () => {
  return (
    <Grid item sm={2} sx={{ display: { xs: 'none', md: 'block' } }}>
      <BoxCustom>
        <FormatListBulletedIcon />
        <Typography sx={{ textTransform: 'uppercase' }}>Danh mục</Typography>
      </BoxCustom>
      <List>
        <CustomListItem>
          <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
            <ListItemText primary="Trang chủ" />
          </Link>
        </CustomListItem>
        <CustomListItem>
          <Link to="/dishes" style={{ textDecoration: 'none', color: '#000' }}>
            <ListItemText primary="Món ăn" />
          </Link>
        </CustomListItem>
        <CustomListItem>
          <Link to="/about" style={{ textDecoration: 'none', color: '#000' }}>
            <ListItemText primary="Giói thiệu" />
          </Link>
        </CustomListItem>
        <CustomListItem>
          <Link to="/service" style={{ textDecoration: 'none', color: '#000' }}>
            <ListItemText primary="Dịch vụ" />
          </Link>
        </CustomListItem>
        <CustomListItem>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#000' }}>
            <ListItemText primary="Liên hệ" />
          </Link>
        </CustomListItem>
      </List>
    </Grid>
  );
};

export default Sidebar;
