import React from 'react';
import GetList from "../../../json/answerer_list_state2.json";


export default function InterviewList(props) {
  const interviewList = GetList.interview_list.filter((x) => x.interview_time.slice(0,10) === props.date)

  return (
    <div>
      {
        interviewList.map((x) => {
          return (<div>{x.interview_time.slice(11)}: {x.title}</div>)
        })
      }
    </div>
  );
}