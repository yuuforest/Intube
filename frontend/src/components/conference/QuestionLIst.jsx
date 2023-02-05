import React, { useEffect, useState } from "react";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export default function QuestionLIst(props) {
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/conference/question?interviewID=" +
          props.interview.id,
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        질문리스트
      </Typography>
      <FormGroup>
        {questionList.map((question) => (
          <FormControlLabel
            control={<Checkbox />}
            label={question.content}
            onChange={props.handleChangeQuestion(question)}
          />
        ))}
      </FormGroup>
    </div>
  );
}
