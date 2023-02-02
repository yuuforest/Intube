import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./AnnouncementSteps.css";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InterviewListItemTag from "components/Interview/InterviewListItemTag";

export default function AnnouncementStep3(props) {
  const [timeList, setTimeList] = React.useState([{ id: 0, value: "" }]);

  const handleChange = (e, id) => {
    console.log(e.target.value);
    setTimeList(
      timeList.map((time) =>
        time.id === id
          ? // user 객체를 update할 때에도 불변성을 지켜줘야 하기 때문에 spread연산자 사용.
            { ...time, value: e.target.value }
          : // 일치하지 않으면 기존의 값 그대로 사용
            time
      )
    );
    console.log(timeList);
  };

  React.useEffect(() => {
    props.step3Handeler(timeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList]);
  const onClickAddTime = (e, index) => {
    setTimeList((timeList) => {
      return [...timeList, { id: index + 1, value: "" }];
    });
  };
  const onClickDeleteTime = (e, id) => {
    setTimeList(timeList.filter((time) => time.id !== id));
    console.log(timeList);
  };

  return (
    <div className="announcement-write" hidden={props.value !== 2}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
        {props.interview.title}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 0, float: "left" }}>
        질문 입력
      </Typography>
      <InterviewListItemTag interview={props.interview} />
      <Divider sx={{ my: 3 }} />

      {timeList.map((time, index) => (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ ml: 1 }}
          key={index}
        >
          <Grid item xs={3}>
            <Typography variant="h6" gutterBottom>
              Q{index + 1}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              sx={{ width: "80%", mb: 2 }}
              value={time.value}
              onChange={(e) => handleChange(e, time.id)}
            />
            {index === timeList.length - 1 ? (
              <IconButton
                aria-label="add"
                onClick={(e) => onClickAddTime(e, time.id)}
                sx={{ ml: 2 }}
              >
                <ControlPointIcon />
              </IconButton>
            ) : index === 0 ? (
              <span></span>
            ) : (
              <IconButton
                aria-label="delete"
                onClick={(e) => onClickDeleteTime(e, time.id)}
                sx={{ ml: 2 }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ my: 3 }} />
    </div>
  );
}
