import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Divider from "@mui/material/Divider";
import PaidIcon from "@mui/icons-material/Paid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import "./AnnouncementPost.css";
import InterviewTag from "components/common/InterviewTag";

export default function AnnouncementStep2(props) {
  const [description, setDescription] = React.useState("");
  const [estimatedTime, setEstimatedTime] = React.useState("");
  const [age, setAge] = React.useState([20, 40]);
  const [gender, setGender] = React.useState("");
  const [maxPeople, setMaxPeople] = React.useState(0);
  const [point, setPoint] = React.useState("");
  const [calcPoint, setCalcPoint] = React.useState(0);
  const [title, setTitle] = React.useState(props.interview.title);
  const [interviewTime, setInterviewTime] = React.useState([
    { id: 0, value: "" },
  ]);

  const titleHandeler = (e) => {
    setTitle(e.target.value);
  };
  React.useEffect(() => {
    const p = interviewTime.length * point * maxPeople;
    setCalcPoint(p);
    props.step2Handeler(
      title,
      description,
      estimatedTime,
      age,
      gender,
      maxPeople,
      point,
      interviewTime,
      p
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    estimatedTime,
    age,
    gender,
    maxPeople,
    point,
    interviewTime,
  ]);

  const descriptionHandeler = (e) => {
    setDescription(e.target.value);
  };

  const estimatedTimeHandeler = (e) => {
    setEstimatedTime(e.target.value);
  };
  const ageHandeler = (e) => {
    setAge(e.target.value);
  };
  const genderHandeler = (e) => {
    setGender(e.target.value);
  };
  const maxPeopleHandeler = (e) => {
    setMaxPeople(e.target.value);
  };
  const pointHandeler = (e) => {
    setPoint(e.target.value);
  };
  const handleChange = (e, id) => {
    setInterviewTime(
      interviewTime.map((time) =>
        time.id === id
          ? // user 객체를 update할 때에도 불변성을 지켜줘야 하기 때문에 spread연산자 사용.
            { ...time, value: e.target.value }
          : // 일치하지 않으면 기존의 값 그대로 사용
            time
      )
    );
  };
  const onClickAddTime = (e, index) => {
    setInterviewTime((interviewTime) => {
      return [...interviewTime, { id: index + 1, value: "" }];
    });
  };
  const onClickDeleteTime = (e, id) => {
    setInterviewTime(interviewTime.filter((time) => time.id !== id));
    console.log(interviewTime);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 60,
      label: "60",
    },
    {
      value: 70,
      label: "70",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 90,
      label: "90",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  return (
    <div className="announcement-write" hidden={props.value !== 1}>
      <TextField
        id="title-input"
        variant="outlined"
        placeholder="공고 제목을 입력하세요"
        fullWidth
        sx={{ my: 3 }}
        value={title}
        onChange={titleHandeler}
      />

      <Typography variant="h5" gutterBottom sx={{ mb: 0, float: "left" }}>
        공고 입력
      </Typography>
      <InterviewTag interview={props.interview} />
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
          <TextField
            variant="outlined"
            sx={{ width: "80%" }}
            multiline
            rows={2}
            value={description}
            onChange={descriptionHandeler}
          />
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
          <OutlinedInput
            endAdornment={<InputAdornment position="end">시간</InputAdornment>}
            type="number"
            id="number-input"
            sx={{ width: "80%" }}
            value={estimatedTime}
            onChange={estimatedTimeHandeler}
          />
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
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={genderHandeler}
            >
              <FormControlLabel value="W" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="O" control={<Radio />} label="Other" />
            </RadioGroup>
            <FormLabel>나이</FormLabel>
          </FormControl>
          <Grid item xs={12}>
            <Slider
              aria-labelledby="demo-row-radio-slider-group-label"
              getAriaLabel={() => "Temperature range"}
              value={age}
              onChange={ageHandeler}
              valueLabelDisplay="auto"
              sx={{ width: "80%" }}
              marks={marks}
            />
          </Grid>
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
          {interviewTime.map((time, index) => (
            <div key={index}>
              <OutlinedInput
                type="datetime-local"
                sx={{ width: "80%", mb: 2 }}
                value={time.value}
                onChange={(e) => handleChange(e, time.id)}
              />
              {index === interviewTime.length - 1 ? (
                <IconButton
                  aria-label="add"
                  sx={{ ml: 2 }}
                  onClick={(e) => onClickAddTime(e, time.id)}
                >
                  <ControlPointIcon />
                </IconButton>
              ) : index === 0 ? (
                <span></span>
              ) : (
                <IconButton
                  sx={{ ml: 2 }}
                  onClick={(e) => onClickDeleteTime(e, time.id)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
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
            모집 인원
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            type="number"
            id="number-input"
            sx={{ width: "80%" }}
            value={maxPeople}
            onChange={maxPeopleHandeler}
          />
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
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <PaidIcon />
              </InputAdornment>
            }
            type="number"
            id="number-input"
            sx={{ width: "80%" }}
            value={point}
            onChange={pointHandeler}
          />
          <Alert severity="error" sx={{ mt: 3, width: "80%" }}>
            <Typography variant="subtitle1" gutterBottom>
              지급 포인트 유의사항
            </Typography>
            <p>- 포인트는 인터뷰횟수 × 지급포인트 × 모집인원으로 계산됩니다.</p>
            <p>- 예상 필요 포인트 : {calcPoint}</p>
            <p>- 공고 생성시 바로 포인트가 차감됩니다.</p>
          </Alert>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" onClick={(e) => props.handleChange(e, 2)}>
          다음
        </Button>
      </Typography>
    </div>
  );
}
