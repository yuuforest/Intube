import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./AnnouncementSteps.css";
import Divider from "@mui/material/Divider";
import PaidIcon from "@mui/icons-material/Paid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InterviewListItemTag from "components/Interview/InterviewListItemTag";

export default function AnnouncementStep2(props) {
  const [value, setValue] = React.useState([20, 37]);
  const [timeList, setTimeList] = React.useState([""]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onClickAddTime = (e) => {
    setTimeList((timeList) => {
      return [...timeList, ""];
    });
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
      />
      <Typography variant="h5" gutterBottom>
        공고 내용
      </Typography>
      <InterviewListItemTag />
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
            sx={{ width: "60%" }}
            multiline
            rows={2}
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
            sx={{ width: "60%" }}
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
            최대 인원
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            type="number"
            id="number-input"
            sx={{ width: "60%" }}
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
            sx={{ width: "60%" }}
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
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormLabel>나이</FormLabel>
          </FormControl>
          <Grid item xs={12}>
            <Slider
              aria-labelledby="demo-row-radio-slider-group-label"
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              sx={{ width: "60%" }}
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
          {timeList.map((time, index) => (
            <div key={index}>
              <OutlinedInput
                type="datetime-local"
                sx={{ width: "60%", mb: 2 }}
                value={time}
              />
              {index === timeList.length - 1 ? (
                <IconButton
                  aria-label="add"
                  onClick={onClickAddTime}
                  sx={{ ml: 2 }}
                >
                  <ControlPointIcon />
                </IconButton>
              ) : index === 0 ? (
                <span></span>
              ) : (
                <IconButton
                  aria-label="add"
                  onClick={onClickAddTime}
                  sx={{ ml: 2 }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </div>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
    </div>
  );
}
