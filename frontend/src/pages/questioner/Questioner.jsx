import React from "react";
import Grid from "@mui/material/Grid";
import "pages/questioner/Questioner.css";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import QuestionerAll from "components/questioner/QuestionerAll";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import QuestionerApply from "components/questioner/QuestionerApply";
import QuestionerNow from "components/questioner/QuestionerNow";

export default function Questioner() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="questioner">
      <QuestionerHeader></QuestionerHeader>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", my: 10 }}
          >
            프리미엄 인터뷰 관리 InTube
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="전체 인터뷰  관리"
                sx={{ minWidth: 1 / 8, fontSize: 18, fontWeight: "bold" }}
              />
              <Tab
                label="지원자 관리"
                sx={{ minWidth: 1 / 8, fontSize: 18, fontWeight: "bold" }}
              />
              <Tab
                label="인터뷰 진행"
                sx={{ minWidth: 1 / 8, fontSize: 18, fontWeight: "bold" }}
              />
              <Tab
                label="인터뷰 관리"
                sx={{ minWidth: 1 / 8, fontSize: 18, fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
          <QuestionerAll value={value}></QuestionerAll>
          <QuestionerApply value={value}></QuestionerApply>
          <QuestionerNow value={value}></QuestionerNow>
        </Grid>
      </Grid>
    </div>
  );
}
