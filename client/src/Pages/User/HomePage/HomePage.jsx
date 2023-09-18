//@mui
import { Box } from '@mui/material';
//component
import Main from '../../../section/home/Main';
import Info from '../../../section/home/info';
import Trusted from '../../../section/home/trusted';
import Accordion from '../../../section/home/accordion';
import Service from '../../../section/home/service';
//--------------------------------------------------------------

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Main />
      <Info />
      <Box>
        <Service />
      </Box>
      <Accordion />
      <Trusted />
    </Box>
  );
};

export default HomePage;
