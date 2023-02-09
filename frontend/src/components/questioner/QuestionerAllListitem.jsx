import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionerTag from "components/questioner/QuestionerTag";
import http from "api/Http";

export default function QuestionerAllListitem(props) {
  const onClickDeadline = (e) => {
    http
      .put(
        "/interviews/interviewer/expired-interview?interview_id=" +
          props.interview.id +
          "&interview_state=5",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        props.getInterviewList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item>
            <QuestionerTag category_name={props.interview.category_name} />
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              {props.interview.title}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)" }}
            >
              {props.interview.apply_start_time}~
              {props.interview.apply_end_time}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 3 }}
            >
              {props.interview.description}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <div>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  mt: 2,
                  mr: 2,
                  float: "right",
                  pointerEvents: "auto",
                }}
                onClick={onClickDeadline}
              >
                마감
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  mt: 2,
                  mr: 2,
                  float: "right",
                }}
              >
                |
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  mt: 2,
                  mr: 2,
                  float: "right",
                }}
              >
                수정
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  mt: 2,
                  mr: 2,
                  float: "right",
                }}
              >
                |
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  mt: 2,
                  mr: 2,
                  float: "right",
                }}
              >
                복사
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  float: "right",
                  mr: 2,
                  pointerEvents: "auto",
                }}
              >
                <QuestionerTag state={props.interview.interview_state} />
              </Typography>
            </div>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item sx={{ width: "72.5px" }}></Grid>
          <Grid item xs={5}>
            {props.interview.interviewTimeDetailResList.map((time) => (
              <div key={time.id}>
                <div>
                  {time.interview_start_time} : {time.apply_applicant_count}/
                  {time.wait_applicant_count}
                </div>
              </div>
            ))}
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
