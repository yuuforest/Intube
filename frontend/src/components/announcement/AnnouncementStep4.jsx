import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import InterviewTag from "components/common/InterviewTag";
import "./AnnouncementPost.css";

export default function AnnouncementStep4(props) {
  const menu = [
    { title: "내용", content: props.interview.description },
    {
      title: "인터뷰 시간",
      content: props.interview.interviewTimeList,
    },
    { title: "소요시간", content: props.interview.estimated_time },
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
  return (
    <div className="announcement-apply" hidden={props.value !== 3}>
      <Grid container spacing={2}>
        <Grid item md={12} xl={6}>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: 32, pb: 0, my: 3 }}>
            공고 미리보기
          </DialogTitle>
          <Box sx={{ p: 2, border: "1px solid rgba(0, 0, 0, .1)" }}>
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
                      <p>{menu.title} : </p>
                    </Grid>
                    <Grid item xs={9}>
                      {menu.title === "인터뷰 시간" ? (
                        props.interview.interviewTimeList.map((time) => (
                          <p key={time.id}>
                            {time.split("T")[0]} {time.split("T")[1]}
                          </p>
                        ))
                      ) : (
                        <p> {menu.content}</p>
                      )}
                      {index === 0 && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            인터뷰 신청시 유의사항
                          </Typography>
                          <p>
                            - 인터뷰는 대상이 될 수 있는 분에게만 개별적으로
                            연락을 드립니다.
                          </p>
                          <p>
                            - 연락을 받지 못하신 것은 조사 대상이 아니라는
                            의미입니다.
                          </p>
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </div>
              ))}
              <Divider />
            </DialogContent>
          </Box>
        </Grid>
        <Grid item md={12} xl={6}>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: 32, pb: 0, my: 3 }}>
            질문목록
          </DialogTitle>
          <Box sx={{ p: 2, border: "1px solid rgba(0, 0, 0, .1)" }}>
            <DialogContent>
              {props.question.map((q, index) => (
                <div key={index}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={3}>
                      <p>Q{index + 1}. </p>
                    </Grid>
                    <Grid item xs={9}>
                      {q}
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              ))}
            </DialogContent>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" onClick={props.step4Handeler}>
          공고등록
        </Button>
      </Typography>
    </div>
  );
}
