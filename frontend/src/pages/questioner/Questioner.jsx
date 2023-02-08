import React from "react";

import "pages/questioner/Questioner.css";
import QuestionerManage from "components/questioner/QuestionerManage";
import QuestionerHeader from "components/questioner/QuestionerHeader";

export default function Questioner() {
  return (
    <div>
      <QuestionerHeader></QuestionerHeader>
      <QuestionerManage></QuestionerManage>
    </div>
  );
}
