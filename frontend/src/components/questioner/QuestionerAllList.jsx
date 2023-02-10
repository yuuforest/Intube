import React from "react";

import QuestionerAllListitem from "components/questioner/QuestionerAllListitem";

export default function QuestionerAllList(props) {
  return (
    <div>
      {props.interviewList.map((interview, index) => (
        <div key={index}>
          <QuestionerAllListitem
            interview={interview}
            index={index}
            getInterviewList={props.getInterviewList}
          />
        </div>
      ))}
    </div>
  );
}
