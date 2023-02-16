import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "api/Http";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import InterviewTag from "components/common/InterviewTag";

import "components/main/interview/MainInterviewListItem.css";

export default function MainAvataInterview(props) {
  const navigate = useNavigate();
  console.log(props.interview);

  const onClickEnter = (id) => {
    const interview = props.interview;
    const interviewId = props.interview.id;
    const interviewTimeId = id;
    const position = 1;
    const isAvata = true;
    http
      .post(
        "/conference/start?interviewTimeID=" + interviewTimeId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        const conferenceID = response.data.conferenceID;
        localStorage.setItem("historyID", response.data.historyID);
        navigate("/conference", {
          state: {
            userInfo,
            interviewId,
            interviewTimeId,
            position,
            conferenceID,
            isAvata,
            interview,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [userInfo, setUserInfo] = useState([]);
  const getUser = () => {
    http
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("userInfo", response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const menu = [
    { title: "내용", content: props.interview.description },
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
    {
      title: "담당자",
      content:
        props.interview.owner_name +
        " / 문의전화 : " +
        props.interview.owner_phone,
    },
  ];

  const handleClickApply = () => {
    props.setOpen(false);
    Swal.fire({
      title: "인터뷰를 신청하시겠습니까?",
      text: "예를 누르시면 인터뷰가 바로 시작됩니다.",
      showDenyButton: true,
      confirmButtonText: "예",
      denyButtonText: "아니오",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        http
          .post(
            "/interviews/apply/avata",
            JSON.stringify({
              interview_id: props.interview.id,
              interview_start_time: new Date(
                new Date().setHours(new Date().getHours() + 9)
              ).toISOString(),
              applicant_state: 2,
            }),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            onClickEnter(response.data);
          })
          .catch((error) => {
            console.log(
              new Date(
                new Date().setHours(new Date().getHours() + 9)
              ).toISOString()
            );
            Swal.fire(error.response.data.message, "", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("네", "", "info");
      }
    });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

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
                  {menu.title} :
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ my: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {menu.content}
                </Typography>

                {index === 0 && (
                  <Alert severity="error" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      인터뷰 신청시 유의사항
                    </Typography>
                    <p>- 아바타 인터뷰는 신청시 바로 시작됩니다.</p>
                    <p>- 소요시간을 확인하고 신청해주세요</p>
                  </Alert>
                )}
              </Grid>
            </Grid>
          </div>
        ))}
        <Divider />
      </DialogContent>

      <DialogActions>
        <Button onClick={(() => handleClose, handleClickApply)}>
          신청하기
        </Button>

        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
