import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GetList from "json/interview_list.json";
import InterviewListItem from "components/Interview/InterviewListItem";
import Grid from "@mui/material/Grid";


const totalList = GetList.interview_list
const onetooneList = totalList.filter((item) => item.category_name === '1:1')
const manytooneList = totalList.filter((item) => item.category_name === 'N:1')


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function InterviewAll() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
  <div>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
        <Tab label="전체" {...a11yProps(0)} />
        <Tab label="1:1" {...a11yProps(1)} />
        <Tab label="N:1" {...a11yProps(2)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {totalList.map((interview) => (
          <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
            <InterviewListItem interview={interview} />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
    <TabPanel value={value} index={1}>
    <Grid container spacing={{ xs: 2, md: 3 }}>
        {onetooneList.map((interview) => (
          <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
            <InterviewListItem interview={interview} />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
    <TabPanel value={value} index={2}>
    <Grid container spacing={{ xs: 2, md: 3 }}>
        {manytooneList.map((interview) => (
          <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
            <InterviewListItem interview={interview} />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  </div> 
  );

}


