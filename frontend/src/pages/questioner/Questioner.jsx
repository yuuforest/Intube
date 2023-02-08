import React from "react";
import Grid from "@mui/material/Grid";
import "pages/questioner/Questioner.css";
import QuestionerManage from "components/questioner/QuestionerManage";
import QuestionerHeader from "components/questioner/QuestionerHeader";

export default function Questioner() {
  return (
    <div className="questioner">
      <QuestionerHeader></QuestionerHeader>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <QuestionerManage></QuestionerManage>
        </Grid>
      </Grid>
    </div>
  );
}
