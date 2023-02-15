import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionerTag from "components/questioner/QuestionerTag";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import http from "api/Http";

export default function QuestionerAllListitem(props) {
  const navigate = useNavigate();
  function handlePage(e, link) {
    console.log(link);
    navigate(link);
  }
  const onClickResult = (e, timeid, timeindex, interview) => {
    navigate("/questioner/result", {
      state: {
        timeid,
        timeindex,
        interview,
      },
    });
  };

  const onClickDeadline = (e) => {
    Swal.fire({
      title: "인터뷰 신청을 마감하시겠습니까?",
      text: "인터뷰를 마감하시면 더이상 참가자를 받을 수 없습니다.",
      showDenyButton: true,
      confirmButtonText: "예",
      denyButtonText: "아니오",
      icon: "question",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        http
          .put(
            "/interviews/interviewer/expired-interview?interview_id=" +
              props.interview.id +
              "&interview_state=" +
              (props.interview.interview_state + 1),
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((response) => {
            props.getInterviewList();
            Swal.fire({
              title: "마감완료",
              text: "",
              icon: "success",
            });
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (result.isDenied) {
        Swal.fire("네", "", "info");
      }
    });
  };
  const onClickBack = (e) => {
    Swal.fire({
      title: "정말로 수정하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "수정",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        http
          .put(
            "/interviews/interviewer/expired-interview?interview_id=" +
              props.interview.id +
              "&interview_state=" +
              (props.interview.interview_state - 1),
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((response) => {
            props.getInterviewList();
            Swal.fire({
              title: "수정완료",
              text: "",
              icon: "success",
            });
            handlePage(e, "/questioner");
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (result.isDenied) {
        Swal.fire("취소되었습니다", "", "info");
      }
    });
  };

  const onClickDelete = (e) => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "삭제",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        http
          .delete("/interviews/delete?interview_id=" + props.interview.id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            props.getInterviewList();
            Swal.fire({
              title: "삭제완료",
              text: "",
              icon: "success",
            });
            handlePage(e, "/questioner");
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (result.isDenied) {
        Swal.fire("취소되었습니다", "", "info");
      }
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
              {props.interview.interview_state === 4 && (
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
                    onClick={onClickDelete}
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: "rgba(0, 0, 0, 0.5)",
                      mt: 2,
                      mr: 2,
                      float: "right",
                    }}
                  >
                    삭제
                  </Typography>
                </div>
              )}

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
            {props.interview.interview_state === 6 &&
              props.interview.interviewTimeDetailResList.map((time, index) => (
                <div key={time.id}>
                  <Typography
                    variant="subtitle1"
                    onClick={(e) =>
                      onClickResult(e, time.id, index, props.interview)
                    }
                    sx={{
                      "&:hover": {
                        color: "primary.dark",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {time.interview_start_time} 인터뷰 결과
                  </Typography>
                </div>
              ))}
            {props.interview.interview_state === 4 &&
              props.interview.category_name !== "AVATA" &&
              props.interview.interviewTimeDetailResList.map((time) => (
                <div key={time.id}>
                  <div>
                    {time.interview_start_time} 인터뷰 지원자 현황 /
                    <span>
                      {" "}
                      합격 : {time.apply_applicant_count} 대기 :{" "}
                      {time.wait_applicant_count}
                    </span>
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
