import React, { useEffect, useState } from "react";
import http from "api/Http";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function QuestionLIst(props) {
  const [questionList, setQuestionList] = useState([]);
  const positionId = props.positionId;
  useEffect(() => {
    http
      .get("/conference/question?interviewID=" + props.interviewId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("질문리스트", response.data);
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {positionId === 1 ? (
        <Card sx={{ mt: 12, ml: 3, mr: 5, width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              질문리스트
            </Typography>
            <FormGroup>
              {questionList.map((question, index) => (
                <FormControlLabel
                  control={<Checkbox />}
                  key={index}
                  label={question.content}
                  onChange={props.handleChangeQuestion(question)}
                />
              ))}
            </FormGroup>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
