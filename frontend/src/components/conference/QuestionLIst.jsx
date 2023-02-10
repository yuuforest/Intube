import React, { useEffect, useState } from "react";
import http from "api/Http";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export default function QuestionLIst(props) {
  const [questionList, setQuestionList] = useState([]);
  const positionId = props.positionId
  useEffect(() => {
    http
      .get("/conference/question?interviewID=" + props.interview.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log('질문리스트', response.data);
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      { positionId === 1 ?
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
      :
      null}
    </div>

  );
}
