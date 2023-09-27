import { useCallback, useEffect, useState } from 'react';
//@mui
import { Box, Paper } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
//component
import OrderTabPanel from './OrderTabPanel';
//Context
import { useOrder } from '../../../hooks/context';
//------------------------------------------------------

const OrderTab = () => {
  const [value, setValue] = useState('All');
  const { handleFilterOrderByStatus } = useOrder();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilter = useCallback((value) => {
    handleFilterOrderByStatus(value);
  }, [handleFilterOrderByStatus]);  

  useEffect(() => {
    handleFilter(value);
  }, [handleFilter, value]);
  
  return (
    <Box>
      <TabContext value={value}>
        <Paper elevation={3}>
          <TabList
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="All" label="All" onClick={handleFilter} />
            <Tab value="Ordered" label="Ordered" onClick={handleFilter} />
            <Tab value="Delivering" label="Delivering" onClick={handleFilter} />
            <Tab value="Delivered" label="Delivered" onClick={handleFilter} />
            <Tab value="Canceled" label="Canceled" onClick={handleFilter} />
          </TabList>
        </Paper>

        <TabPanel sx={{ p: '24px 0' }} value="All">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="Ordered">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="Delivering">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="Delivered">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="Canceled">
          <OrderTabPanel />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default OrderTab;
