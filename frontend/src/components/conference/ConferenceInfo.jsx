import React from "react";

import {
  DialogTitle,
  DialogContent,
  Dialog,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import InterviewTag from "components/common/InterviewTag";

export default function ConferenceInfo(props) {
  const { onClose, selectedValue, open, interview } = props;
  const menu = [
    { title: "내용", content: props.interview.description },
    {
      title: "공통대상",
      content:
        props.interview.start_standard_age +
        "~" +
        props.interview.end_standard_age +
        "세 " +
        (props.interview.gender === "W"
          ? "여성"
          : props.interview.gender === "M"
          ? "남성"
          : "상관없음"),
    },
    { title: "지급 포인트", content: props.interview.standard_point },
  ];
  const handleClose = () => {
    onClose(selectedValue);
  };
  console.log(interview);
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      sx={{ px: 10 }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 28, pb: 0 }}>
        {props.interview.title}
      </DialogTitle>
      <DialogContent>
        <InterviewTag interview={props.interview}></InterviewTag>
        {menu.map((menu, index) => (
          <div key={index}>
            <Divider />
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {menu.title}
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ my: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {menu.content}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
        <Divider />
      </DialogContent>
    </Dialog>
  );
}
