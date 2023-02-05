import React from "react";
import axios from "axios";
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
import InterviewListItemTag from "./InterviewListItemTag";
import "./InterviewListItemDetail.css";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const NewAlert = React.forwardRef(function NewAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InterviewListItemDetail(props) {
  const onClickApply = () => {
    axios
      .post(
        "http://localhost:8080/interviews/apply/" + applyTime,
        {},
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
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

  const handleApplyTimeChange = (event) => {
    setApplyTime(event.target.value);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  // 방입장
  const interview = props.interview;
  const navigate = useNavigate();
  function onClickEnter(e) {
    navigate("/conference", { state: { interview, userName } });
  }
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    axios
      .get("http://i8a303.p.ssafy.io:8081/user/me", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        <InterviewListItemTag
          interview={props.interview}
        ></InterviewListItemTag>
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
                  Array.isArray(menu.content) ? (
                    <Select
                      onChange={handleApplyTimeChange}
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
                    <p> {menu.content}</p>
                  )
                ) : (
                  <p> {menu.content}</p>
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
          <Button onClick={(() => handleClose, onClickApply)}>신청하기</Button>
        )}
        {props.interview.applicant_state === 1 && (
          <Button onClick={handleClose}>취소하기</Button>
        )}
        {props.interview.applicant_state === 2 && (
          <Button onClick={onClickEnter}>입장하기</Button>
        )}
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          신청을 완료했습니다.!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
