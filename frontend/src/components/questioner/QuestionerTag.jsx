import React from "react";
import Chip from "@mui/material/Chip";
import { blue, red, green, purple, yellow, cyan } from "@mui/material/colors";

export default function QusetionerTag(props) {
  return (
    <div className="state-tag">
      {props.state === 4 && (
        <Chip
          label="모집중"
          size="small"
          sx={{ mt: "20px", background: purple[100], color: purple[900] }}
          color="primary"
        />
      )}
      {props.state === 5 && (
        <Chip
          label="진행중"
          size="small"
          sx={{ mt: "20px", background: yellow[100], color: yellow[900] }}
          color="primary"
        />
      )}
      {props.state === 6 && (
        <Chip
          label="완료"
          size="small"
          sx={{ mt: "20px", background: blue[100], color: blue[900] }}
          color="primary"
        />
      )}
      {props.category_name === "1:1" && (
        <Chip
          label="1:1인터뷰"
          size="small"
          sx={{
            mt: "20px",
            background: red[100],
            color: red[900],
          }}
          color="primary"
        />
      )}
      {props.category_name === "1:N" && (
        <Chip
          label="1:N인터뷰"
          size="small"
          sx={{
            mt: "20px",
            background: green[100],
            color: green[900],
          }}
          color="primary"
        />
      )}
      {props.category_name === "AVATA" && (
        <Chip
          label="아바타인터뷰"
          size="small"
          sx={{
            mt: "20px",
            background: cyan[100],
            color: cyan[900],
          }}
          color="primary"
        />
      )}
    </div>
  );
}
