import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

export default function CloseAnnouncement() {
  const location = useLocation();
  const interview = location.state;
  const [time, setTime] = React.useState(
    interview.interviewTimeDetailResList[0].interview_start_time
  );
  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", ml: 3, mt: 3, textAlign: "center" }}
      >
        완료 인터뷰
      </Typography>
      <Select
        value={time}
        onChange={handleChange}
        sx={{ float: "right", mr: 5 }}
      >
        {interview.interviewTimeDetailResList.map((time) => (
          <MenuItem value={time.interview_start_time}>
            {time.interview_start_time}
          </MenuItem>
        ))}
      </Select>
      <Divider sx={{ mt: 10 }} />
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: "bold", ml: 5, mt: 3 }}
      >
        인터뷰 내용
      </Typography>
    </div>
  );
}
