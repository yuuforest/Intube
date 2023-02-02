import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./AnnouncementSteps.css";
import Divider from "@mui/material/Divider";
import PaidIcon from "@mui/icons-material/Paid";
import InterviewListItemTag from "components/Interview/InterviewListItemTag";

export default function AnnouncementStep4(props) {
  return (
    <div className="announcement-write" hidden={props.value !== 3}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
        {props.interview.title}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 0, float: "left" }}>
        공고 등록
      </Typography>
      <InterviewListItemTag interview={props.interview}></InterviewListItemTag>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            인터뷰 내용
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" gutterBottom>
            {props.interview.description}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            소요시간
          </Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="h6" gutterBottom>
            {props.interview.estimated_time} 시간
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            최대 인원
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" gutterBottom>
            {props.interview.max_people} 명
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            지급 포인트
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <PaidIcon sx={{ float: "left", pt: "4px", pr: 1 }} />
          <Typography variant="h6" gutterBottom>
            {props.interview.point}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            공통대상
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" gutterBottom>
            {props.interview.start_standard_age} ~
            {props.interview.end_standard_age} / {props.interview.gender}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            진행 시간
          </Typography>
        </Grid>
        <Grid item xs={9}>
          {props.interview.interview_time.map((time, index) => (
            <div key={index}>
              <Typography variant="h6" gutterBottom>
                - {time.split("T")[0]} {time.split("T")[1]}
              </Typography>
            </div>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ ml: 1 }}
      >
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            질문 목록
          </Typography>
        </Grid>
        <Grid item xs={9}>
          {props.question.map((q, index) => (
            <div key={index}>
              <Typography variant="h6" gutterBottom>
                - Q{index + 1} : {q}
              </Typography>
            </div>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
    </div>
  );
}
