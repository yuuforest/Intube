import React from "react";
import Chip from "@mui/material/Chip";
import { blue, red, green } from "@mui/material/colors";
import "components/questioner/QuestionerTag.css";
export default function QusetionerTag(props) {
  return (
    <div className="state-tag">
      {props.state === 4 && (
        <Chip
          label="모집중"
          size="small"
          sx={{ mr: 1, background: red[100], color: red[900] }}
          color="primary"
        />
      )}
      {props.state === 5 && (
        <Chip
          label="진행중"
          size="small"
          sx={{ mr: 1, background: green[100], color: green[900] }}
          color="primary"
        />
      )}
      {props.state === 6 && (
        <Chip
          label="완료"
          size="small"
          sx={{ mr: 1, background: blue[100], color: blue[900] }}
          color="primary"
        />
      )}
    </div>
  );
}
