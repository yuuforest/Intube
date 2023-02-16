import React from "react";
// import InterviewListItemDetail from "components/main/interview/MainInterviewListItemDetail";
import AnswererListItemDetail from "../AnswererListItemDetail";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
export default function MatchListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        onClick={handleClickOpen}
        justifyContent="flex-start"
      >
        <Grid item xs={2}>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            {props.interview.interviewTimeRes.interview_start_time.slice(11)}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button variant="text" sx={{ float: "right" }}>
            자세히 {">"}
          </Button>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            {props.interview.title}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Divider></Divider>
        </Grid>
      </Grid>

      <AnswererListItemDetail
        open={open}
        setOpen={setOpen}
        interview={props.interview}
      />

      {/* {
        props.position === 1
        ?
        <AnswererListItemDetail
        open={open}
        setOpen={setOpen}
        interview={props.interview}
        />
        :
        // 이 부분 질문자 관련된 modal로 수정하기!
        <AnswererListItemDetail
          open={open}
          setOpen={setOpen}
          interview={props.interview}
        />
      } */}
    </div>
  );
}
