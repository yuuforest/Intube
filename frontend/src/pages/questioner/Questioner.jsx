import React from "react";
import Grid from "@mui/material/Grid";
import "pages/questioner/Questioner.css";
import QuestionerManage from "components/questioner/QuestionerManage";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import Typography from "@mui/material/Typography";

export default function Questioner() {
  return (
    <div className="questioner">
      <QuestionerHeader></QuestionerHeader>=
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", my: 5 }}
          >
            인터뷰 관리
          </Typography>

          <QuestionerManage></QuestionerManage>
        </Grid>
      </Grid>
    </div>
  );
}
