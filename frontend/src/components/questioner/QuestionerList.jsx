import React from "react";

import QuestionListitem from "components/questioner/QuestionListitem";

export default function QuestionerList(props) {
  return (
    <div>
      {props.interviewList.map((interview, index) => (
        <div key={index}>
          <QuestionListitem
            interview={interview}
            index={index}
            getInterviewList={props.getInterviewList}
          />
        </div>
      ))}
    </div>
  );
}
