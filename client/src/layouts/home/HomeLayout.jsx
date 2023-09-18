import { Outlet } from 'react-router-dom';
//@mui
import Header from './header/Header';
import Footer from './footer/Footer';
import { Box } from '@mui/material';

//----------------------------------------------------

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default HomeLayout;
