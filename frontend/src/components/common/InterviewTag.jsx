import React from "react";
import Chip from "@mui/material/Chip";
import { blue, red, green, indigo, yellow } from "@mui/material/colors";
import "./InterviewTag.css";

export default function InterviewListItemTag(props) {
  return (
    <div className="interview_item-tag">
      {props.interview.applicant_state === 1 && (
        <Chip
          label="신청완료"
          size="small"
          sx={{
            mr: 1,
            background: indigo[100],
            color: indigo[900],
          }}
        />
      )}
      {props.interview.applicant_state === 2 && (
        <Chip
          label="매칭완료"
          size="small"
          sx={{ mr: 1, background: yellow[100], color: yellow[900] }}
          color="primary"
        />
      )}
      {props.interview.category_name === "1:1" && (
        <Chip
          label="1:1 인터뷰"
          size="small"
          sx={{ mr: 1, background: red[100], color: red[900] }}
          color="primary"
        />
      )}
      {props.interview.category_name === "1:N" && (
        <Chip
          label="1:N 인터뷰"
          size="small"
          sx={{ mr: 1, background: green[100], color: green[900] }}
          color="primary"
        />
      )}
      {props.interview.category_name === "avatar" && (
        <Chip
          label="아바타 인터뷰"
          size="small"
          sx={{ mr: 1, background: blue[100], color: blue[900] }}
          color="primary"
        />
      )}
    </div>
  );
}
