import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { blue, green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function QuestionListittem(props) {
  const navigate = useNavigate();

  const [userName, setUserName] = useState([]);
  const interview = props.interview;
  function handlePageConference(e, link) {
    navigate(link, { state: { interview, userName } });
  }

  const index = props.index;
  function handlePageApply(e, link) {
    navigate(link, { state: { interview, index } });
  }

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
    <MenuItem>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item sx={{ textAlign: "center" }}>
          <Chip
            label={props.interview.category_name}
            size="small"
            sx={{
              background: green[100],
              color: green[900],
              mt: "20px",
              ml: 1,
            }}
            color="primary"
          />
        </Grid>
        <Grid item xs={4}>
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
            {props.interview.apply_start_time}~{props.interview.apply_end_time}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 3 }}
          >
            {props.interview.description}
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item>
          <div>
            <Chip
              label="모집중"
              size="small"
              sx={{
                background: blue[100],
                color: blue[900],
                mt: "20px",
                mr: 5,
                float: "left",
              }}
              color="primary"
            />
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
            >
              마감
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 2, mr: 2, float: "right" }}
            >
              |
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 2, mr: 2, float: "right" }}
              onClick={(e) => {
                handlePageConference(e, "/conference");
              }}
            >
              수정
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 2, mr: 2, float: "right" }}
            >
              |
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "rgba(0, 0, 0, 0.5)", mt: 2, mr: 2, float: "right" }}
            >
              복사
            </Typography>
          </div>

          <Button
            variant="outlined"
            sx={{ width: "100%", float: "left", mt: 2, height: 50 }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              onClick={(e) => {
                handlePageApply(e, "/questioner/apply");
              }}
            >
              <Grid item>지원자</Grid>
              <Grid item>1명</Grid>
              <Grid item>|</Grid>
              <Grid item>합격자</Grid>
              <Grid item>2명</Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
    </MenuItem>
  );
}
