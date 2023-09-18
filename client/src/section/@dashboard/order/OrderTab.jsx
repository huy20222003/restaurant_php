import { useState } from 'react';
//@mui
import { Paper } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
//------------------------------------------------------

const OrderTab = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={2}>
      <TabContext value={value}>
        <TabList
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="All" />
          <Tab value="2" label="Ordered" />
          <Tab value="3" label="Delivering" />
          <Tab value="4" label="Delivered" />
          <Tab value="5" label="Canceled" />
        </TabList>
        <TabPanel value="1">All</TabPanel>
        <TabPanel value="2">Ordered</TabPanel>
        <TabPanel value="3">Delivering</TabPanel>
        <TabPanel value="4">Delivered</TabPanel>
        <TabPanel value="5">Canceled</TabPanel>
      </TabContext>
    </Paper>
  );
};

export default OrderTab;
