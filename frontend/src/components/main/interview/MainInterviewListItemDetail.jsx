import React from "react";
import { useNavigate } from "react-router-dom";
import http from "api/Http";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import InterviewTag from "components/common/InterviewTag";

import "components/main/interview/MainInterviewListItem.css";

export default function MainInterviewListItemDetail(props) {
  const menu = [
    { title: "내용", content: props.interview.description },
    {
      title: "인터뷰 시간",
      content: props.interview.interviewTimeResList,
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
    {
      title: "담당자",
      content: props.interview.owner_name + "\n" + props.interview.owner_phone,
    },
  ];

  const [applyTime, setApplyTime] = React.useState(
    props.interview.interviewTimeResList[0].interview_start_time
  );

  const handleChangeApplyTime = (event) => {
    setApplyTime(event.target.value);
  };

  const handleClickApply = () => {
    http
      .post(
        "/interviews/apply/" + applyTime,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        props.setOpen(false);
        Swal.fire({
          title: "신청이 완료되었습니다.",
          text: "",
          icon: "success",
        });
      })
      .catch((error) => {
        props.setOpen(false);
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error",
        });
      });
  };

  // 방입장
  const interview = props.interview;
  const navigate = useNavigate();
  function handleClickEnter(e) {
    navigate("/conference", { state: { interview } });
  }

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
              <Grid item xs={9}>
                {menu.title === "인터뷰 시간" ? (
                  props.interview.applicant_state === 0 ? (
                    <Select
                      onChange={handleChangeApplyTime}
                      value={applyTime}
                      variant="standard"
                      sx={{ mt: 1 }}
                    >
                      {props.interview.interviewTimeResList.map((time) => (
                        <MenuItem value={time.id} key={time.id}>
                          {time.interview_start_time}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <p> ? </p>
                  )
                ) : (
                  <Typography variant="subtitle1" gutterBottom>
                    {menu.content}
                  </Typography>
                )}
                {index === 0 && props.interview.applicant_state === 0 ? (
                  <Alert severity="error" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      인터뷰 신청시 유의사항
                    </Typography>
                    <p>
                      - 인터뷰는 대상이 될 수 있는 분에게만 개별적으로 연락을
                      드립니다.
                    </p>
                    <p>
                      - 연락을 받지 못하신 것은 조사 대상이 아니라는 의미입니다.
                    </p>
                  </Alert>
                ) : index === 0 && props.interview.applicant_state === 1 ? (
                  <Alert severity="warning" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      신청 인터뷰 유의사항
                    </Typography>
                    <p>- 인터뷰를 취소하면 인터뷰 온도가 내려갑니다</p>
                    <p>- 매칭된 이후로는 취소가 불가합니다.</p>
                    <p>- 인터뷰 취소로 발생하는 문제는 본인 책임입니다.</p>
                  </Alert>
                ) : index === 0 && props.interview.applicant_state === 2 ? (
                  <Alert severity="success" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      매칭 인터뷰 유의사항
                    </Typography>
                    <p>- 인터뷰 시간이 되면 입장하기 버튼이 활성화 됩니다.</p>
                  </Alert>
                ) : (
                  <p></p>
                )}
              </Grid>
            </Grid>
          </div>
        ))}
        <Divider />
      </DialogContent>

      <DialogActions>
        {props.interview.applicant_state === 0 && (
          <Button onClick={(() => handleClose, handleClickApply)}>
            신청하기
          </Button>
        )}
        {props.interview.applicant_state === 1 && (
          <Button onClick={handleClose}>취소하기</Button>
        )}
        {props.interview.applicant_state === 2 && (
          <Button onClick={handleClickEnter}>입장하기</Button>
        )}
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
