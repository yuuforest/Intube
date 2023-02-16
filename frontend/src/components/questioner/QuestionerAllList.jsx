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
            setValue={props.setValue}
            getInterviewList={props.getInterviewList}
            setSelectId={props.setSelectId}
            setSelectTimeIndex={props.setSelectTimeIndex}
          />
        </div>
      ))}
    </div>
  );
}
