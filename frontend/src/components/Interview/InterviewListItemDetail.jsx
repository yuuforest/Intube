import React from "react";
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

export default function InterviewListItemDetail(props) {
  const [time, setTime] = React.useState(props.interview.interview_time[0]);

  const handleChange = (event) => {
    setTime(event.target.value);
  };
  const menu = [
    { title: "내용", content: props.interview.description },
    { title: "인터뷰 시간", content: props.interview.interview_time },
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
    { title: "지급 포인트", content: props.interview.point },
    {
      title: "담당자",
      content: props.interview.owner_name + "\n" + props.interview.owner_phone,
    },
  ];

  // "인터뷰 종류",
  // "인터뷰 시간",
  // "소요시간",
  // "내용",
  // "공통대상",
  // "지급 포인트",
  // "담당자",
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
                      onChange={handleChange}
                      value={time}
                      variant="standard"
                      sx={{ mt: 1 }}
                    >
                      {props.interview.interview_time.map((time, index) => (
                        <MenuItem value={time} key={index}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <p> {menu.content}</p>
                  )
                ) : (
                  <p> {menu.content}</p>
                )}
                {index === 0 && props.interview.applicant_state === "0" ? (
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
                ) : index === 0 && props.interview.applicant_state === "1" ? (
                  <Alert severity="warning" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      신청 인터뷰 유의사항
                    </Typography>
                    <p>- 인터뷰를 취소하면 인터뷰 온도가 내려갑니다</p>
                    <p>- 매칭된 이후로는 취소가 불가합니다.</p>
                    <p>- 인터뷰 취소로 발생하는 문제는 본인 책임입니다.</p>
                  </Alert>
                ) : index === 0 && props.interview.applicant_state === "2" ? (
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
        {props.interview.applicant_state === "0" && (
          <Button onClick={handleClose}>신청하기</Button>
        )}
        {props.interview.applicant_state === "1" && (
          <Button onClick={handleClose}>취소하기</Button>
        )}
        {props.interview.applicant_state === "2" && (
          <Button onClick={handleClose}>입장하기</Button>
        )}
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
