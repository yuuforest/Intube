import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import getQuestionList from "json/question_list.json";
export default function QuestionLIst({handleChangeQuestion}) {
    const newList = getQuestionList.question_list.map((item) => {
        return item;
      });
  return (
    <FormGroup>
        {newList.map((question) => (
             <FormControlLabel  control={<Checkbox/>} label={question.content} key={question.questionID} onChange={handleChangeQuestion(question.content)}/>
          ))}
    </FormGroup>
  )
}
