import QuestionLIst from "components/conference/QuestionLIst";
import NowQuestion from "components/conference/NowQuestion";
import React from "react";
import AnswerWrite from "components/conference/AnswerWrite";
import Button from "@mui/material/Button";

export default function Conference() {
  const [state, setState] = React.useState({
    question: "",
  });
  const handleChangeQuestion = (item) => (event) => {
    console.log(item);

    setState({ ...state, question: item });
  };

  return (
    <div>
      <QuestionLIst handleChangeQuestion={handleChangeQuestion} />
      <NowQuestion state={state} />
      <p></p>
      <AnswerWrite state={state}></AnswerWrite>
      <p></p>
      <Button variant="outlined">종료</Button>
    </div>
  );
}
